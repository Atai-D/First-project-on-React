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
    let adminsBlogs = [];
    let usersBlogs = [];
    blogs.forEach((blog) =>
        blog.isAdminWrote ? adminsBlogs.push(blog) : usersBlogs.push(blog)
    );
    console.log(blogs);

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
            history.push(`${history.location.pathname}?${search.toString()}}`);
            getBlogsData();
            setType(e.target.value);
            return;
        }
        const search = new URLSearchParams(history.location.search);
        search.set("category", e.target.value);
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
        history.push(`${history.location.pathname}?${search.toString()}`);
        getBlogsData();
        setPrice(getPrice());
    };

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">Brand</FormLabel>
                <RadioGroup value={type} onChange={handleChangeType}>
                    <FormControlLabel
                        value="arts"
                        control={<Radio />}
                        label="Arts"
                    />
                    <FormControlLabel
                        value="entertainment"
                        control={<Radio />}
                        label="Entertainment"
                    />
                    <FormControlLabel
                        value="parks"
                        control={<Radio />}
                        label="Parks"
                    />
                    <FormControlLabel
                        value="all"
                        control={<Radio />}
                        label="Reset category"
                    />
                </RadioGroup>
            </FormControl>
            <Grid>
                <Slider
                    value={price}
                    onChange={handleChangePrice}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                />
                <Button onClick={resetPrice} variant="outlined" color="primary">
                    Reset price
                </Button>
            </Grid>
            {blogs.length > 0 ? (
                <>
                    {adminsBlogs.map((blog) => (
                        <BlogCard blog={blog} />
                    ))}
                    {usersBlogs.map((blog) => (
                        <BlogCard blog={blog} />
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
                <div>Похоже здесь нет блогов</div>
            )}
        </>
    );
};

export default BlogList;
