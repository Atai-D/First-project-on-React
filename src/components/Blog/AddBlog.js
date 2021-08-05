import {
    Container,
    Grid,
    TextField,
    Typography,
    Button as ButtonUI,
    MenuItem,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import { useBlog } from "../../contexts/BlogContext";
import { BLOG_ACTIONS, CATEGORIES, JSON_API_BLOGS } from "../../helpers/consts";

const AddBlog = () => {
    const {
        history,
        dispatch,
        blogTitle,
        setBlogTitle,
        blogImage,
        setBlogImage,
        blogText,
        setBlogText,
        blogCategory,
        setBlogCategory,
    } = useBlog();

    const { logged } = useAutho();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        console.log(logged);
        if (!logged.isLogged) {
            alert("Зарегистрируйтесь, чтобы создать блок");
            history.push("/");
        }

        return () => {
            setBlogTitle("");
            setBlogImage("");
            setBlogText("");
        };
    }, [logged]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newBlog = {
            title: blogTitle,
            image: blogImage,
            text: blogText,
            category: blogCategory,
        };
        console.log(newBlog);
        dispatch({
            type: BLOG_ACTIONS.ADD_BLOG,
            payload: newBlog,
        });
        const res = await axios.post(JSON_API_BLOGS, newBlog);
        console.log(res);
    };

    return (
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
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                        />
                        <TextField
                            name="image"
                            variant="outlined"
                            required
                            label="Image URL"
                            type="text"
                            value={blogImage}
                            onChange={(e) => setBlogImage(e.target.value)}
                        />
                        <TextField
                            name="text"
                            label="Your text"
                            multiline
                            rows={5}
                            cols={5}
                            variant="outlined"
                            value={blogText}
                            onChange={(e) => setBlogText(e.target.value)}
                        />
                        <TextField
                            name="category"
                            id="outlined-select-currency"
                            select
                            required
                            label="Select"
                            value={blogCategory}
                            onChange={(e) => setBlogCategory(e.target.value)}
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
                        </TextField>
                    </Grid>
                    <ButtonUI variant="contained" type="submit">
                        Add
                    </ButtonUI>
                </Grid>
            </form>
        </Container>
    );
};

export default AddBlog;
