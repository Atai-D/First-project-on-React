import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    BLOG_ACTIONS,
    CATEGORIES,
    JSON_API_BLOGS,
    JSON_API_USERS,
    BLOG_LIMIT,
} from "../helpers/consts";
import { useAutho } from "./AuthorizationContext";

const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

const BlogContextProvider = ({ children }) => {
    const { logged, changeLoggedUser } = useAutho();

    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogText, setBlogText] = useState("");
    const [blogPrice, setBlogPrice] = useState("");
    const [blogCategory, setBlogCategory] = useState(CATEGORIES[0].value);
    const [promoted, setPromoted] = useState("");
    const [isPromoted, setIsPromoted] = useState(false);
    // const [newBlog, setNewBlog] = useState({});

    const [editModal, setEditModal] = useState(false);

    const history = useHistory();

    const [edittingId, setEdittingId] = useState("");

    const INIT_STATE = {
        blogs: [],
        blogDetails: {},
        pages: 1,
    };

    const reduce = (state = INIT_STATE, action) => {
        switch (action.type) {
            case BLOG_ACTIONS.GET_BLOGS_DATA:
                return {
                    ...state,
                    blogs: action.payload.data,
                    pages: Math.ceil(
                        action.payload.headers["x-total-count"] / BLOG_LIMIT
                    ),
                };
            case BLOG_ACTIONS.ADD_BLOG:
                let newBlogs = [...state.blogs];
                newBlogs.push(action.payload);
                return { ...state, blogs: newBlogs };
            case BLOG_ACTIONS.GET_BLOG_DETAILS:
                return { ...state, blogDetails: action.payload };
            case BLOG_ACTIONS.ISEDITTING_USER:
                return { ...state, isEdittingUser: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reduce, INIT_STATE);

    const getBlogDetails = async (id) => {
        const { data } = await axios(`${JSON_API_BLOGS}/${id}`);
        dispatch({
            type: BLOG_ACTIONS.GET_BLOG_DETAILS,
            payload: data,
        });
    };

    const getBlogsData = async () => {
        const search = new URLSearchParams(history.location.search);
        search.set("_limit", BLOG_LIMIT);
        search.set("_sort", "priority");
        search.set("_order", "desc");
        history.push(`${history.location.pathname}?${search.toString()}`);
        const res = await axios(`${JSON_API_BLOGS}/${window.location.search}`);
        dispatch({
            type: BLOG_ACTIONS.GET_BLOGS_DATA,
            payload: res,
        });
    };

    const addBlog = async (
        title,
        image,
        text,
        price,
        category,
        isPromoted,
        promoted
    ) => {
        const date = new Date();
        const date1 = date.toUTCString();
        let newBlog = {
            title: title,
            image: image,
            text: text,
            category: category,
            author: logged.email,
            date: date1,
            price: price,
            priority: isPromoted ? 3 : logged.isAdmin ? 2 : 1,
            isAdminWrote: logged.isAdmin,
            authorsId: logged.id,
        };
        dispatch({
            type: BLOG_ACTIONS.ADD_BLOG,
            payload: newBlog,
        });

        const res = await axios.post(JSON_API_BLOGS, newBlog);
        newBlog.id = res.data.id;

        let userWithBlog = {
            ...logged,
            usersBlogs: [...logged.usersBlogs, newBlog],
        };

        localStorage.setItem("user", JSON.stringify(userWithBlog));
        changeLoggedUser(userWithBlog);
        console.log(logged.usersBlogs);
        let { data } = await axios.patch(
            `${JSON_API_USERS}/${logged.id}`,
            userWithBlog
        );

        console.log(data);
    };

    const deleteBlog = async (id, authorsId) => {
        console.log(authorsId);
        const res = await axios.delete(`${JSON_API_BLOGS}/${id}`);

        const { data } = await axios(`${JSON_API_USERS}/${authorsId}`);
        console.log(data, `${JSON_API_USERS}/${authorsId}`);

        let filteredBlogs = data?.usersBlogs?.filter((blog) => {
            return blog.id !== id;
        });

        const userWithoutBlog = { ...data, usersBlogs: filteredBlogs };
        console.log(userWithoutBlog);
        const array = await axios.patch(
            `${JSON_API_USERS}/${authorsId}`,
            userWithoutBlog
        );

        localStorage.setItem("user", JSON.stringify(userWithoutBlog));

        changeLoggedUser(userWithoutBlog);
        getBlogsData();
    };

    const deleteBlogDetails = () => {
        const data = {};
        dispatch({
            type: BLOG_ACTIONS.GET_BLOG_DETAILS,
            payload: data,
        });
        history.goBack();
    };

    const saveEditBlog = async (editedBlog) => {
        const { data } = await axios.patch(
            `${JSON_API_BLOGS}/${editedBlog.id}`,
            editedBlog
        );
        const blogs = await axios(`${JSON_API_USERS}/${editedBlog.authorsId}`);
        let editedBlogs = blogs.data.usersBlogs.map((blog) => {
            if (editedBlog.id === blog.id) {
                return editedBlog;
            } else {
                return blog;
            }
        });
        const array = await axios.patch(
            `${JSON_API_USERS}/${editedBlog.authorsId}`,
            editedBlogs
        );
        if (editedBlog.authorsId == logged.id) {
            let arr = logged.usersBlogs.map((blog) => {
                if (editedBlog.id === blog.id) {
                    return editedBlog;
                } else {
                    return blog;
                }
            });
            let user = { ...logged, usersBlogs: arr };
            localStorage.setItem("user", JSON.stringify(user));
        }
        getBlogsData();
    };

    // const changeEdittingUser = async (id, authorsId) => {};

    // const deleteBlogData = () => {
    //     const
    // }

    const value = {
        history,
        dispatch,
        blogs: state.blogs,
        blogTitle,
        setBlogTitle,
        blogImage,
        setBlogImage,
        blogText,
        setBlogText,
        blogCategory,
        setBlogCategory,
        blogDetails: state.blogDetails,
        getBlogDetails,
        getBlogsData,
        deleteBlog,
        deleteBlogDetails,
        editModal,
        setEditModal,
        edittingId,
        setEdittingId,
        saveEditBlog,
        pages: state.pages,
        blogPrice,
        setBlogPrice,
        addBlog,
        promoted,
        setPromoted,
        isPromoted,
        setIsPromoted,
    };
    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};

export default BlogContextProvider;
