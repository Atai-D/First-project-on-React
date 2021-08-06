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

const useStyles = makeStyles({
    root: {
        maxWidth: 380,
        margin: 15,
    },
});

export default function BlogCard({ blog }) {
    const classes = useStyles();

    const history = useHistory();

    const { deleteBlog, getBlogsData } = useBlog();

    // let { user } = JSON.parse(localStorage.getItem("user"));
    const findAdminAuthor = async () => {
        const { data } = await axios(JSON_API_BLOGS);
        console.log(data);
    };

    const handleDeleteBtn = (id, authorsId) => {
        console.log(authorsId);
        deleteBlog(id, authorsId);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea
                id={blog.id}
                onClick={() => {
                    history.push(`/blog/${blog.id}`);
                    findAdminAuthor();
                }}
            >
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={blog.image}
                    title="Contemplative Reptile"
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
                <Button
                    size="small"
                    color="primary"
                    onClick={() => handleDeleteBtn(blog.id, blog.authorsId)}
                >
                    Delete
                </Button>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Typography variant="body2" color="textSecondary" component="p">
                    {blog.isAdminWrote ? (
                        <em style={{ color: "red" }}>
                            Автор:{blog.author}(RECOMENDEN BY BBBLOG)
                        </em>
                    ) : (
                        <em> Автор:{blog.author}</em>
                    )}
                </Typography>
            </CardActions>
        </Card>
    );
}
