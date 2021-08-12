import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CssBaseline, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { JSON_API_BLOGS, JSON_API_USERS } from "../../helpers/consts";
import axios from "axios";
import { useBlog } from "../../contexts/BlogContext";
import { useAutho } from "../../contexts/AuthorizationContext";
import EditBlog from "./EditBlog";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        margin: 15,
        backgroundColor: "#8ab584",
        color: "white",
    },
    blogBtn: {
        color: "white",
    },
    blogCardAuthor: {
        // backgroundColor:"rgb(0,0,0,0.1)",
        // borderRadius: "5px",
        // display: "flex",
        // flexDirection: "column",
        // width: "100%",
    },
    blogCardBtn: {
        // backgroundColor:""
        width: "100%",
    },
    blogBtn: {
        backgroundColor: "rgb(0,0,0,0.1)",
        color: "white",
        margin: "3px",
        // minWidth: "100px",
        width: "100%",
    },
    blogBtn: {
        // backgroundColor: non,
        color: "white",
        margin: "3px",
        // minWidth: "100px",
        width: "100%",
    },
    blogCardInf: {
        display: "flex",
        justifyContent: "row",
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
        addBlogToCart,
        addLike,
    } = useBlog();

    const { logged } = useAutho();

    // let { user } = JSON.parse(localStorage.getItem("user"));
    // const findAdminAuthor = async () => {
    //     const { data } = await axios(JSON_API_BLOGS);
    //     console.log(data);
    // };

    const handleDeleteBtn = (id, authorsId) => {
        deleteBlog(id, authorsId);
    };

    const handleEditBtn = (id) => {
        setEditModal(true);
        setEdittingId(id);
    };

    const handlePromotionBtn = (blog, authorId) => {
        addBlogToCart(blog);
    };

    const handleLikeBtn = () => {
        addLike(blog);
    };

    return (
        <Card className={classes.root}>
            {/* <CssBaseline /> */}
            <CardActionArea
                id={blog.id}
                onClick={() => {
                    history.push(`/blog/${blog.id}`);
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
                    <Typography gutterBottom variant="p" component="p">
                        Likes: {blog?.usersLikes?.length}
                        <br />
                        Comments: {blog?.comments?.length}
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
                        {blog.text.split("").slice(0, 20).join("") + "..."}
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
            <CardActions className={classes.blogCardInf}>
                {logged.email === blog.author || logged.isAdmin ? (
                    <div>
                        {/* <DeleteOutlineIcon className={classes.blogBtn} /> */}
                    </div>
                ) : (
                    ""
                )}
            </CardActions>
            <CardActions>
                {logged.isLogged ? (
                    <SentimentVerySatisfiedIcon 
                        // size="small"
                        color="#fff"
                        onClick={() => handleLikeBtn()}
                    >
                        Like
                    </SentimentVerySatisfiedIcon>
                ) : (
                    ""
                )}
            </CardActions>
            <CardActions className={classes.blogCardInf}>
                {/* <div className={classes.blogCardInf} > */}
                {logged.id === blog.authorsId || logged.isAdmin ? (
                    <div>
                        <DeleteOutlineIcon
                            className={classes.blogBtn}
                            size="small"
                            color="primary"
                            onClick={() =>
                                handleDeleteBtn(blog.id, blog.authorsId)
                            }
                        >
                            Delete
                        </DeleteOutlineIcon>
                        <EditOutlinedIcon
                            className={classes.blogBtn}
                            size="small"
                            color="primary"
                            onClick={() => handleEditBtn(blog.id)}
                        >
                            Edit
                        </EditOutlinedIcon>
                        {blog.priority !== 3 ? (
                            <Button
                                className={classes.blogBtn}
                                size="small"
                                color="primary"
                                onClick={() =>
                                    handlePromotionBtn(blog, blog.authorsId)
                                }
                            >
                                Promote
                            </Button>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

                <Typography variant="body2" color="textSecondary" component="p">
                    {
                        <div className={classes.blogCardAuthor}>
                            {showAuthor ? (
                                blog.priority == 2 ? (
                                    <em style={{ color: "white" }}>
                                        RECOMENDED BY B-BBLOG
                                    </em>
                                ) : blog.priority == 3 ? (
                                    <>
                                        <em style={{ color: "white" }}>
                                            Author:{blog.author}
                                        </em>
                                        <br />
                                        <em style={{ color: "white" }}>
                                            RECOMENDED BY B-BBLOG
                                        </em>
                                    </>
                                ) : (
                                    <em style={{ color: "white" }}>
                                        Author: {blog.author}
                                    </em>
                                )
                            ) : (
                                ""
                            )}
                        </div>
                    }
                </Typography>

                {/* </div> */}
            </CardActions>
        </Card>
    );
}
