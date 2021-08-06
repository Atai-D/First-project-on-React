import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    BLOG_ACTIONS,
    CATEGORIES,
    JSON_API_BLOGS,
    JSON_API_USERS,
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
    const [blogCategory, setBlogCategory] = useState(CATEGORIES[0].value);
    // const [newBlog, setNewBlog] = useState({});

    const history = useHistory();

    const INIT_STATE = {
        blogs: [],
        blogDetails: {},
    };

    const reduce = (state = INIT_STATE, action) => {
        switch (action.type) {
            case BLOG_ACTIONS.GET_BLOGS_DATA:
                return { ...state, blogs: action.payload };
            case BLOG_ACTIONS.ADD_BLOG:
                let newBlogs = [...state.blogs];
                newBlogs.push(action.payload);
                return { ...state, blogs: newBlogs };
            case BLOG_ACTIONS.GET_BLOG_DETAILS:
                return { ...state, blogDetails: action.payload };
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
        const { data } = await axios(JSON_API_BLOGS);
        dispatch({
            type: BLOG_ACTIONS.GET_BLOGS_DATA,
            payload: data,
        });
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
    };
    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};

export default BlogContextProvider;
