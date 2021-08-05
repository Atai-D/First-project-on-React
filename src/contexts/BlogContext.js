import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { BLOG_ACTIONS, CATEGORIES } from "../helpers/consts";

const BlogContext = createContext();

export const useBlog = () => {
    return useContext(BlogContext);
};

const BlogContextProvider = ({ children }) => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogImage, setBlogImage] = useState("");
    const [blogText, setBlogText] = useState("");
    const [blogCategory, setBlogCategory] = useState(CATEGORIES[0].value);
    // const [newBlog, setNewBlog] = useState({});

    const history = useHistory();

    const INIT_STATE = {
        blogs: [],
    };

    const reduce = (state = INIT_STATE, action) => {
        switch (action.type) {
            case BLOG_ACTIONS.ADD_BLOG:
                let newBlogs = [...state.blogs];
                newBlogs.push(action.payload);
                return { ...state, blogs: newBlogs };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reduce, INIT_STATE);

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
    };
    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};

export default BlogContextProvider;
