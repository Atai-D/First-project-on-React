import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useBlog } from "../../contexts/BlogContext";
import { useAutho } from "../../contexts/AuthorizationContext";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
        <div style={{ marginBottom: "30px" }}>
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
                        style={{ backgroundColor: "#f0ed90" }}
                    />
                    <Button onClick={handleEditComment}>
                        <EditIcon
                            style={{
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    </Button>
                    <br />
                </>
            ) : (
                <div>{comment.comment}</div>
            )}
            {comment.authorsEmail === logged.email && logged.isLogged ? (
                <Button
                    onClick={() => handleDeleteComment(comment, blogDetails)}
                >
                    <DeleteIcon
                        style={{
                            width: "20px",
                            height: "20px",
                        }}
                    />
                </Button>
            ) : (
                ""
            )}
            {!openEditInp &&
            comment.authorsEmail === logged.email &&
            logged.isLogged ? (
                <Button onClick={handleOpenEditComment}>
                    <EditIcon
                        style={{
                            width: "20px",
                            height: "20px",
                        }}
                    />
                </Button>
            ) : (
                ""
            )}
        </div>
    );
};

export default CommentCard;
