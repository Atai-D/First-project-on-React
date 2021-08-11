import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { useAutho } from "../../contexts/AuthorizationContext";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
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

    const {
        blogDetails,
        getBlogDetails,
        deleteBlog,
        getBlogsData,
        deleteBlogDetails,
    } = useBlog();

    const { logged } = useAutho();

    useEffect(() => {
        getBlogDetails(id);
    }, []);

    const handleDeleteBtn = (id, authorsId) => {
        console.log(authorsId);
        deleteBlog(id, authorsId);
        deleteBlogDetails();
    };

    console.log(blogDetails);
    return (
        <>
            {blogDetails ? (
                <Card className={classes.root}>
                    <CardHeader
                        title={blogDetails.title}
                        subheader={new Date(blogDetails?.date).toUTCString()}
                    />
                    <CardMedia
                        className={classes.media}
                        image={blogDetails.image}
                        title="Paella dish"
                    />
                    <CardActions>
                        {logged.email === blogDetails.author ||
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
                                    Delete
                                </Button>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </>
                        ) : (
                            ""
                        )}
                    </CardActions>
                    <CardContent>
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
                                        Автор:{blogDetails.author}
                                    </em>
                                    <br />
                                    <em style={{ color: "red" }}>
                                        RECOMENDED BY B-BBLOG
                                    </em>
                                </>
                            ) : (
                                <em> Автор:{blogDetails.author}</em>
                            )}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                ""
            )}
        </>
    );
}
