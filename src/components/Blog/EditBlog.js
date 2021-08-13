import {
    Container,
    Grid,
    TextField,
    Typography,
    Button as ButtonUI,
    MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import { useBlog } from "../../contexts/BlogContext";
import {
    BLOG_ACTIONS,
    CATEGORIES,
    JSON_API_BLOGS,
    JSON_API_USERS,
} from "../../helpers/consts";

const EditBlog = () => {
    const {
        editModal,
        setEditModal,
        blogDetails,
        edittingId,
        setEdittingId,
        getBlogDetails,
        saveEditBlog,
    } = useBlog();

    const [blog, setBlog] = useState(blogDetails);
    const [editCategory, setEditCategory] = useState(CATEGORIES[0].value);

    const handleInp = (e) => {
        let obj = {
            ...blog,
            [e.target.name]: e.target.value,
        };
        setBlog(obj);
    };

    useEffect(() => {
        getBlogDetails(edittingId);
    }, [edittingId]);

    useEffect(() => {
        setBlog(blogDetails);
    }, [blogDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
        saveEditBlog(blog);
        setEditModal(false);
        // getBlogDetails(edittingId);
    };

    return (
        <Modal
            size="lg"
            show={editModal}
            onHide={() => {
                setEditModal(false);
            }}
            style={{ color: "#bfe0c2", zIndex: "10000" }}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container commponent="main" maxWidth="xs">
                    <form action="" onSubmit={handleSubmit}>
                        <Grid container>
                            <Typography
                                component="h1"
                                variant="h5"
                                style={{ marginBottom: "10px" }}
                            >
                                Add Blog
                            </Typography>
                            <Grid>
                                <TextField
                                    name="title"
                                    variant="outlined"
                                    required
                                    label="Title"
                                    type="text"
                                    value={blog.title}
                                    onChange={handleInp}
                                />
                                <TextField
                                    name="image"
                                    variant="outlined"
                                    required
                                    label="Image URL"
                                    type="text"
                                    value={blog.image}
                                    onChange={handleInp}
                                />
                                <TextField
                                    name="text"
                                    label="Your text"
                                    multiline
                                    rows={5}
                                    cols={5}
                                    variant="outlined"
                                    value={blog.text}
                                    onChange={handleInp}
                                />
                                {/* <TextField
                                    name="category"
                                    id="outlined-select-currency"
                                    select
                                    required
                                    label="Select"
                                    value={editCategory}
                                    onChange={(e) =>
                                        setEditCategory(e.target.value)
                                    }
                                    helperText="Please select your currency"
                                    variant="outlined"
                                >
                                    {CATEGORIES.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField> */}
                            </Grid>
                            <ButtonUI variant="contained" type="submit">
                                Save
                            </ButtonUI>
                        </Grid>
                    </form>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default EditBlog;
