import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { green } from "@material-ui/core/colors";
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
        marginLeft: "-15px !important",
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
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },

    blogListContainer: {
        backgroundColor: "#ffffe6",
        paddingBottom: "20px",
    },
    blogListCards: {
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    blogListCategory: {},
    sideBar: {
        paddingLeft: "20px",
        position: "absolute",
        zIndex: 100,
        backgroundColor: "rgba(191, 224, 194,0.9)",
        borderRadius: "20px",
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

    const GreenRadio = withStyles({
        root: {
            color: green[400],
            "&$checked": {
                color: green[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    const [showCategories, setShowCategories] = useState(false);

    const [selectedValue, setSelectedValue] = React.useState("a");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <>
            <div className={classes.blogListContainer}>
                <Button
                    onClick={() => setShowCategories(!showCategories)}
                    style={{
                        color: "#8ab584",
                        fontFamily: "nunito",
                        fontWeight: "bold",
                    }}
                >
                    Categories
                </Button>
                {showCategories ? (
                    <div className={classes.sideBar}>
                        <FormControl
                            className={classes.blogListCategory}
                            component="fieldset"
                        >
                            <RadioGroup
                                value={type}
                                onChange={handleChangeType}
                            >
                                {CATEGORIES.map((option) => (
                                    <FormControlLabel
                                        value={option.value}
                                        control={
                                            <GreenRadio
                                                checked={
                                                    selectedValue ===
                                                    option.value
                                                }
                                                onChange={handleChange}
                                                value={option.value}
                                                name="radio-button-demo"
                                            />
                                        }
                                        label={option.label}
                                    />
                                ))}
                                <FormControlLabel
                                    value="all"
                                    control={
                                        <GreenRadio
                                            checked={selectedValue === "all"}
                                            onChange={handleChange}
                                            value="all"
                                            name="radio-button-demo"
                                        />
                                    }
                                    label="Reset category"
                                />
                            </RadioGroup>
                        </FormControl>
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
                ) : (
                    ""
                )}

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

                        <div
                            className={classes.blogListPagination}
                            style={{ marginTop: "20px" }}
                        >
                            <Pagination
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                                count={pages}
                                color="primary"
                                page={+page}
                                variant="outlined"
                                size="large"
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
