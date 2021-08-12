import {
    Container,
    Grid,
    TextField,
    Typography,
    Button as ButtonUI,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import { useBlog } from "../../contexts/BlogContext";
import {
    BLOG_ACTIONS,
    CATEGORIES,
    JSON_API_BLOGS,
    JSON_API_USERS,
} from "../../helpers/consts";

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
        blogPrice,
        setBlogPrice,
        addBlog,
        promoted,
        setPromoted,
        isPromoted,
        setIsPromoted,
    } = useBlog();

    const { logged, changeLoggedUser } = useAutho();

    // useEffect(() => {
    //     let user = JSON.parse(localStorage.getItem("user"));
    //     console.log(logged);
    //     if (!user) {
    //         alert("Зарегистрируйтесь, чтобы создать блок");
    //         history.push("/");
    //     }
    // }, [logged]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isPromoted && !promoted) {
            alert("Заполните продвижение");
        } else {
            addBlog(
                blogTitle,
                blogImage,
                blogText,
                blogPrice,
                blogCategory,
                isPromoted,
                promoted
            );
            setBlogTitle("");
            setBlogImage("");
            setBlogText("");
            setBlogPrice("");
        }
    };

    return (
        <Container commponent="main" maxWidth="xs" >
            <form action="" onSubmit={handleSubmit}>
                <Grid container style={{margin:"100px 0px"}}>
                    <Typography
                        component="h1"
                        variant="h5"
                        style={{
                            marginBottom: "10px",
                            color: "#8ab584",
                            fontFamily: "nunito",
                        }}
                    >
                        Add Blog
                    </Typography>
                    <Grid >
                        <TextField
                            fullWidth={720}
                            name="title"
                            variant="outlined"
                            required
                            label="Title"
                            type="text"
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            style={{color: "#8ab584", fontFamily: "nunito", marginBottom: "10px"}}
                        />
                        <br />
                        <TextField
                        fullWidth={720}
                            name="image"
                            variant="outlined"
                            required
                            label="Image URL"
                            type="text"
                            value={blogImage}
                            onChange={(e) => setBlogImage(e.target.value)}
                            style={{color: "#8ab584", fontFamily: "nunito", marginBottom: "10px"}}
                        />
                        <br />
                        <TextField
                        fullWidth={720}
                            name="price"
                            variant="outlined"
                            required
                            label="Average Price (KG)"
                            type="number"
                            value={blogPrice}
                            onChange={(e) => setBlogPrice(e.target.value)}
                            style={{color: "#8ab584", fontFamily: "nunito", marginBottom: "10px"}}
                        />

                        <TextField
                        fullWidth={720}
                            name="text"
                            label="Your text"
                            multiline
                            rows={5}
                            cols={5}
                            variant="outlined"
                            value={blogText}
                            onChange={(e) => setBlogText(e.target.value)}
                            style={{color: "#8ab584", fontFamily: "nunito", marginBottom: "10px"}}
                        />
                        <br />
                        <TextField
                        fullWidth={720}
                            name="category"
                            id="outlined-select-currency"
                            select
                            required
                            label="Select"
                            value={blogCategory}
                            onChange={(e) => setBlogCategory(e.target.value)}
                            variant="outlined"
                            style={{ color: "#8ab584", fontFamily: "nunito" }}
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
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isPromoted}
                                    onChange={(e) =>
                                        setIsPromoted(e.target.checked)
                                    }
                                    name="ispromoted"
                                    // color="primary"
                                    style={{color: "#8ab584", fontFamily: "nunito"}}
                                />
                            }
                            label="Promote" */}
                        {/* /> */}
                        {/* {isPromoted ? (
                            <TextField
                                name="promote"
                                variant="outlined"
                                label="Promote"
                                type="text"
                                value={promoted}
                                onChange={(e) => setPromoted(e.target.value)}
                                style={{color: "#8ab584", fontFamily: "nunito"}}
                            />
                        ) : (
                            ""
                        )} */}
                    </Grid>
                    <ButtonUI variant="contained" type="submit" style={{color: "#8ab584", fontFamily: "nunito", marginTop: "10px"}}>
                        Add
                    </ButtonUI>
                </Grid>
            </form>
        </Container>
    );
};

export default AddBlog;

