import {
    FormControl,
    FormLabel,
    Grid,
    Slider,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    InputBase,
    
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { CATEGORIES } from "../../helpers/consts";
import BlogCard from "./BlogCard";
import EditBlog from "./EditBlog";
import { fade, makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        // float: "left",
        margin: "10px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,

        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create("width"),
        // width: "100%",
        // [theme.breakpoints.up("md")]: {
        //     width: "20ch",
        // },
    },
    blogListContainer:{
        // backgroundColor:"#ffecd4",
        // display:"flex"
    },
    blogListCards:{
        // display: "flex",
        // justifyContent: "row",
        // alignItems:"center",
        // flexWrap: "wrap"
    },
    blogListCategory:{
        // marginTop: "10px",
        // backgroundColor:"#8ab584",
        // borderRadius: "5px",
        // color: "white",
        // minWidth: "20%"
    }, 
    sideBar:{
        // display:"flex",
        // justifyContent: "column",
        // height: "25%",
        // width: "25%",
        // backgroundColor: "#8ab584",
        // minHeight: "100vh"
    },
}));

const BlogList = () => {
    const classes = useStyles();
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
        search.set("_page", "1");
        setPage(1);
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
    const handleValue = (e) => {
        const search = new URLSearchParams(history.location.search);
        search.set("q", e.target.value);
        history.push(`${history.location.pathname}?${search.toString()}`);
        getBlogsData();
    };

    return (
        <>
            <div className={classes.blogListContainer}>
                <div className={classes.sideBar}>
                    <FormControl
                        className={classes.blogListCategory}
                        component="fieldset"
                    >
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
                    <Grid
                        style={{
                            width: "290px",
                            backgroundColor: "#8ab584",
                            color: "white",
                            borderRadius: "5px",
                            marginTop: "10px",
                        }}
                    >
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
                        <Button
                            onClick={resetPrice}
                            variant="outlined"
                            color="primary"
                        >
                            Reset price
                        </Button>

                        <div
                            style={{
                                marginTop: "30px ",
                                backgroundColor: "#8ab584",
                                borderRadius: "5px",
                            }}
                        >
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ "aria-label": "search" }}
                                    onChange={(e) => handleValue(e)}
                                />
                            </div>
                        </div>
                    </Grid>
                </div>

                {blogs?.length > 0 ? (
                    <>
                        <div className={classes.blogListCards}>
                            {adminsBlogs.map((blog) => (
                                <BlogCard blog={blog} showAuthor={true} />
                            ))}
                            {usersBlogs.map((blog) => (
                                <BlogCard blog={blog} showAuthor={true} />
                            ))}
                            <div>
                                <EditBlog />
                            </div>
                        </div>

                        <div className={classes.blogListPagination} style={{}}>
                            <Pagination
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
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
            </div>
        </>
    );
};

export default BlogList;


