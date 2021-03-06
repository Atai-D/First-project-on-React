import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { useAutho } from "../../contexts/AuthorizationContext";
import { Button, Grid } from "@material-ui/core";
import EditBlog from "./EditBlog";
import CommentCard from "./CommentCard";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,

        backgroundColor: "#f0ed90",
        fontFamily: "nunito",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function BlogDetails() {
    const { id } = useParams();
    const classes = useStyles();
    const [openInp, setOpenInp] = useState(false);
    const [commentInp, setCommentInp] = useState("");
    const {
        blogDetails,
        getBlogDetails,
        deleteBlog,
        getBlogsData,
        deleteBlogDetails,
        setEditModal,
        setEdittingId,
        addLike,
        history,
        addComment,
    } = useBlog();

    const { logged } = useAutho();

    useEffect(() => {
        setEdittingId(id);
        getBlogDetails(id);
    }, []);

    const handleDeleteBtn = (id, authorsId) => {
        deleteBlog(id, authorsId);
        deleteBlogDetails();
        history.push("/bloglist");
        getBlogsData();
    };

    const handleEditBtn = (id) => {
        setEditModal(true);
        setEdittingId(id);
    };

    const handleLikeBtn = () => {
        addLike(blogDetails);
        getBlogDetails(id);
    };

    const handleOpenComment = () => {
        setOpenInp(true);
    };
    const handleSendComment = () => {
        addComment(commentInp, blogDetails);
        setOpenInp(false);
        getBlogDetails(id);
        setCommentInp("");
    };
    return (
        <div style={{ overflowX: "hidden" }}>
            {blogDetails ? (
                <Grid
                    container
                    spacing={10}
                    style={{
                        margin: "20px 0",
                        padding: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100vw",
                    }}
                >
                    <Card className={classes.root}>
                        <CardHeader
                            title={blogDetails.title}
                            subheader={new Date(
                                blogDetails?.date
                            ).toUTCString()}
                        />
                        <CardMedia
                            className={classes.media}
                            image={blogDetails.image}
                            title="Paella dish"
                        />
                        <CardActions style={{ marginLeft: "25px" }}>
                            <h5>likes: {blogDetails?.usersLikes?.length}</h5>
                            {logged.isLogged ? (
                                <Button
                                    size="small"
                                    onClick={() => handleLikeBtn()}
                                >
                                    <FavoriteIcon />
                                </Button>
                            ) : (
                                ""
                            )}
                            {(logged.email === blogDetails.author &&
                                logged.isLogged) ||
                            logged.isAdmin ? (
                                <>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() =>
                                            handleDeleteBtn(
                                                blogDetails.id,
                                                blogDetails.authorsId
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </Button>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() =>
                                            handleEditBtn(blogDetails.id)
                                        }
                                    >
                                        <EditIcon />
                                    </Button>
                                    <div>
                                        <EditBlog />
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </CardActions>
                        <CardContent style={{ marginLeft: "20px" }}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {blogDetails.text}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                Price: {blogDetails.price} KG
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                Category: {blogDetails.category}
                            </Typography>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                {blogDetails.priority == 2 ? (
                                    <em style={{ color: "red" }}>
                                        RECOMENDED BY B-BBLOG
                                    </em>
                                ) : blogDetails.priority == 3 ? (
                                    <>
                                        <em style={{ color: "red" }}>
                                            ??????????:{blogDetails.author}
                                        </em>
                                        <br />
                                        <em style={{ color: "red" }}>
                                            RECOMENDED BY B-BBLOG
                                        </em>
                                    </>
                                ) : (
                                    <em> ??????????:{blogDetails.author}</em>
                                )}
                            </Typography>
                        </CardContent>
                        <div style={{ marginLeft: "40px" }}>
                            {logged.isLogged ? (
                                <Button onClick={handleOpenComment}>
                                    Add Comment
                                </Button>
                            ) : (
                                ""
                            )}
                            <br />
                            {openInp ? (
                                <>
                                    <input
                                        type="text"
                                        value={commentInp}
                                        style={{ backgroundColor: "#f0ed90" }}
                                        onChange={(e) =>
                                            setCommentInp(e.target.value)
                                        }
                                    />
                                    <Button onClick={handleSendComment}>
                                        <SendIcon
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                            {blogDetails?.comments?.length > 0 ? (
                                blogDetails.comments.map((comment) => (
                                    <CommentCard
                                        comment={comment}
                                        blogDetails={blogDetails}
                                    />
                                ))
                            ) : (
                                <>
                                    <div>?????????? ?????? ????????????????????????</div>
                                </>
                            )}
                        </div>
                    </Card>
                </Grid>
            ) : (
                ""
            )}
        </div>
    );
}
