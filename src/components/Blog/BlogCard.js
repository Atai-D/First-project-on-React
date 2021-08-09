import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { JSON_API_BLOGS, JSON_API_USERS } from "../../helpers/consts";
import axios from "axios";
import { useBlog } from "../../contexts/BlogContext";
import { useAutho } from "../../contexts/AuthorizationContext";
import EditBlog from "./EditBlog";

const useStyles = makeStyles({
    root: {
        maxWidth: 380,
        margin: 15,
    },
});

export default function BlogCard({ blog, showAuthor }) {
    const classes = useStyles();

    const history = useHistory();

    const {
        deleteBlog,
        getBlogsData,
        setEditModal,
        edittingId,
        setEdittingId,
    } = useBlog();

    const { logged } = useAutho();

    // let { user } = JSON.parse(localStorage.getItem("user"));
    // const findAdminAuthor = async () => {
    //     const { data } = await axios(JSON_API_BLOGS);
    //     console.log(data);
    // };

    const handleDeleteBtn = (id, authorsId) => {
        console.log(authorsId);
        deleteBlog(id, authorsId);
    };

    const handleEditBtn = (id) => {
        setEditModal(true);
        setEdittingId(id);
    };

    function checkImage(url) {
        var image = new Image();
        image.onload = function () {
            if (this.width > 0) {
                console.log("image exists");
            }
        };
        image.onerror = function () {
            console.log("image doesn't exist");
        };
        image.src = url;
    }

    return (
        <Card className={classes.root}>
            <CardActionArea
                id={blog.id}
                onClick={() => {
                    history.push(`/blog/${blog.id}`);
                    // findAdminAuthor();
                }}
            >
                <CardMedia
                    component="img"
                    alt="asd"
                    height="140"
                    image={blog.image}
                    title="Show more about this blog"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {blog.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Price: {blog.price} KG
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {blog.text}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        Category: {blog.category}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {logged.email === blog.author || logged.isAdmin ? (
                    <>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() =>
                                handleDeleteBtn(blog.id, blog.authorsId)
                            }
                        >
                            Delete
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => handleEditBtn(blog.id)}
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    ""
                )}

                <Typography variant="body2" color="textSecondary" component="p">
                    {
                        <>
                            {showAuthor ? (
                                blog.priority == 2 ? (
                                    <em style={{ color: "red" }}>
                                        RECOMENDED BY B-BBLOG
                                    </em>
                                ) : blog.priority == 3 ? (
                                    <>
                                        <em style={{ color: "red" }}>
                                            Автор:{blog.author}
                                        </em>
                                        <br />
                                        <em style={{ color: "red" }}>
                                            RECOMENDED BY B-BBLOG
                                        </em>
                                    </>
                                ) : (
                                    <em> Автор:{blog.author}</em>
                                )
                            ) : (
                                ""
                            )}
                        </>
                    }
                </Typography>
            </CardActions>
        </Card>
    );
}
