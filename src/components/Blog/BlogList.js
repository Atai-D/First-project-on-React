import {
    FormControl,
    FormLabel,
    Grid,
    Slider,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { CATEGORIES } from "../../helpers/consts";
import BlogCard from "./BlogCard";
import EditBlog from "./EditBlog";

const BlogList = () => {
    const { blogs, getBlogsData, pages } = useBlog();
    const history = useHistory();
    const getCurrentPage = () => {
        const search = new URLSearchParams(window.location.search);

        if (!search.get("_page")) {
            return 1;
        }

        return search.get("_page");
    };
    const [page, setPage] = useState(getCurrentPage());
    useEffect(() => {
        getBlogsData();
    }, []);

    const handlePage = (e, page) => {
        const search = new URLSearchParams(window.location.search);
        search.set("_page", page);
        history.push(`${history.location.pathname}?${search.toString()}`);
        getBlogsData();
        setPage(page);
    };

    const [type, setType] = useState(getType());
    const [price, setPrice] = useState(getPrice());

    function getType() {
        const search = new URLSearchParams(history.location.search);
        return search.get("category");
    }

    function getPrice() {
        const search = new URLSearchParams(history.location.search);
        return search.get("price_lte");
    }

    const handleChangeType = (e) => {
        if (e.target.value == "all") {
            const search = new URLSearchParams(history.location.search);
            search.delete("category");
            // search.delete("page");
            search.set("_page", "1");
            setPage(1);
            history.push(`${history.location.pathname}?${search.toString()}}`);
            getBlogsData();
            setType(e.target.value);
            return;
        }
        const search = new URLSearchParams(history.location.search);
        search.set("category", e.target.value);
        search.set("_page", "1");
        setPage(1);
        history.push(`${history.location.pathname}?${search.toString()}`);
        getBlogsData();
        setType(e.target.value);
    };

    const handleChangePrice = (e, value) => {
        console.log(value);
        const search = new URLSearchParams(history.location.search);
        search.set("price_lte", value);
        console.log(search);
        history.push(`${history.location.pathname}?${search.toString()}`);
        getBlogsData();
        setPrice(value);
    };

    const resetPrice = () => {
        const search = new URLSearchParams(history.location.search);
        search.delete("price_lte");
        search.delete("_page");
        history.push(`${history.location.pathname}?${search.toString()}`);
        getBlogsData();
        setPrice(getPrice());
    };

    let adminsBlogs = [];
    let usersBlogs = [];
    blogs.map((blog) => {
        if (blog.isAdminWrote) {
            adminsBlogs.push(blog);
        } else {
            usersBlogs.push(blog);
        }
    });

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup value={type} onChange={handleChangeType}>
                    {CATEGORIES.map((option) => (
                        <FormControlLabel
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                        />
                    ))}
                    <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="Reset category"
                    />
                </RadioGroup>
            </FormControl>
            <Grid style={{ maxWidth: "400px" }}>
                <div>Price in KG(SOM)</div>
                <Slider
                    value={price}
                    onChange={handleChangePrice}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={5}
                    min={0}
                    max={1000}
                />
                <Button onClick={resetPrice} variant="outlined" color="primary">
                    Reset price
                </Button>
            </Grid>
            {blogs?.length > 0 ? (
                <>
                    {adminsBlogs.map((blog) => (
                        <BlogCard blog={blog} showAuthor={true} />
                    ))}
                    {usersBlogs.map((blog) => (
                        <BlogCard blog={blog} showAuthor={true} />
                    ))}
                    <div>
                        <EditBlog />
                    </div>
                    <div style={{ margin: "20px auto" }}>
                        <Pagination
                            count={pages}
                            color="primary"
                            page={+page}
                            onChange={handlePage}
                        />
                    </div>
                </>
            ) : (
                <h1>Похоже здесь нет блогов</h1>
            )}
        </>
    );
};

export default BlogList;
