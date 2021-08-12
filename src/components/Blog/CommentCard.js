import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useBlog } from "../../contexts/BlogContext";
import { useAutho } from "../../contexts/AuthorizationContext";

const CommentCard = ({ comment, blogDetails }) => {
    const [openInp, setOpenInp] = useState(false);
    const [commentInp, setCommentInp] = useState("");
    const [openEditInp, setOpenEditInp] = useState(false);
    const [editInp, setEditInp] = useState("");
    const { addComment, deleteComment, editComment, getBlogDetails } =
        useBlog();

    const { logged } = useAutho();

    const handleOpenComment = () => {
        setOpenInp(true);
    };

    const handleSendComment = () => {
        addComment(commentInp, blogDetails);
        setOpenInp(false);
        getBlogDetails(blogDetails.id);
        setCommentInp("");
    };

    const handleDeleteComment = (comment, blogDetails) => {
        deleteComment(comment, blogDetails);
    };

    const handleOpenEditComment = () => {
        setEditInp(comment.comment);
        setOpenEditInp(!openEditInp);
    };

    const handleEditComment = () => {
        editComment(comment, blogDetails, editInp);
        console.log(blogDetails);
        setOpenEditInp(!openEditInp);
    };
    return (
        <div style={{ marginBottom: "20px" }}>
            <div>
                {/* {logged.id === blogDetails.authorsId ? (
                                          <input
                                              value={editInp}
                                              onChange={(e) =>
                                                  setEditInp(e.target.value)
                                              }
                                          /> */}
                {/* ) : ( */}
                <em>{comment.authorsEmail}</em>
                {/* )} */}
            </div>
            {openEditInp ? (
                <>
                    <input
                        value={editInp}
                        onChange={(e) => setEditInp(e.target.value)}
                    />
                    <Button onClick={handleEditComment}>Edit</Button> <br />
                </>
            ) : (
                <div>{comment.comment}</div>
            )}
            {comment.authorsEmail === logged.email ? (
                <Button
                    onClick={() => handleDeleteComment(comment, blogDetails)}
                >
                    Delete
                </Button>
            ) : (
                ""
            )}
            {!openEditInp && comment.authorsEmail === logged.email ? (
                <Button onClick={handleOpenEditComment}>Edit</Button>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommentCard;
