import { AssignmentInd } from "@material-ui/icons";
import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    BLOG_ACTIONS,
    CATEGORIES,
    JSON_API_BLOGS,
    JSON_API_USERS,
    BLOG_LIMIT,
    calcTotalPrice,
    calcSubPrice,
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

    const [editModal, setEditModal] = useState(false);

    const history = useHistory();

    const [edittingId, setEdittingId] = useState(3);

    const INIT_STATE = {
        blogs: [],
        blogDetails: {},
        pages: 1,
        promotionBlogs: [],
        cart: [],
        payingBlogs: [],
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
            case BLOG_ACTIONS.ADD_PROMOTION_BLOG:
                return { ...state, promotionBlogs: action.payload };
            case BLOG_ACTIONS.GET_CART:
                return { ...state, cart: action.payload };
            case BLOG_ACTIONS.GET_PAYING_BLOGS:
                return { ...state, payingBlogs: action.payload };
            case BLOG_ACTIONS.GET_PROMOTIONS_DATA:
                return { ...state, promotionBlogs: action.payload };
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

    const addBlog = async (title, image, text, price, category, isPromoted) => {
        if (isPromoted) {
            history.push("/payment");
        } else {
            const date = Date.now();
            let newBlog = {
                title: title,
                image: image,
                text: text,
                category: category,
                author: logged.email,
                date: date,
                price: +price,
                usersLikes: [],
                comments: [],
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
            let { data } = await axios.patch(
                `${JSON_API_USERS}/${logged.id}`,
                userWithBlog
            );

            alert("?????? ???????? ?????????????? ??????????????????????");
        }
    };

    const deleteBlog = async (id, authorsId) => {
        const res = await axios.delete(`${JSON_API_BLOGS}/${id}`);

        const { data } = await axios(`${JSON_API_USERS}/${authorsId}`);

        let filteredBlogs = data?.usersBlogs?.filter((blog) => {
            return blog.id !== id;
        });

        const userWithoutBlog = { ...data, usersBlogs: filteredBlogs };
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
        let editedUser = { ...logged, usersBlogs: editedBlogs };
        const array = await axios.patch(
            `${JSON_API_USERS}/${editedBlog.authorsId}`,
            editedUser
        );
        changeLoggedUser(editedUser);
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
        getBlogDetails(editedBlog.id);
    };

    const getCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            localStorage.setItem(
                "cart",
                JSON.stringify({
                    blogs: [],
                    totalPrice: 0,
                })
            );
            cart = {
                blogs: [],
                totalPrice: 0,
            };
        }
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const addBlogToCart = async (blog) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            cart = {
                blogs: [],
                totalPrice: 0,
            };
        }
        let newblog = { ...blog, days: 15, promPrice: 20, subPrice: 15 * 20 };

        let blogToFind = cart.blogs.filter((item) => item.id === blog.id);
        if (blogToFind.length == 0) {
            cart.blogs.push(newblog);
        } else {
            cart.blogs = cart.blogs.filter((item) => item.id !== blog.id);
        }
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const changeBlogCount = (days, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.blogs = cart.blogs.map((blog) => {
            if (blog.id === id) {
                blog.days = days;
                blog.subPrice = calcSubPrice(blog);
            }
            return blog;
        });
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const changeBlogPrice = (promPrice, id) => {
        let cart = JSON.parse(localStorage.getItem("cart"));
        cart.blogs = cart.blogs.map((blog) => {
            if (blog.id === id) {
                blog.promPrice = promPrice;
                blog.subPrice = calcSubPrice(blog);
            }
            return blog;
        });
        cart.totalPrice = calcTotalPrice(cart.blogs);
        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: cart,
        });
    };

    const deleteCart = () => {
        localStorage.removeItem("cart");
        let noCart = [];
        dispatch({
            type: BLOG_ACTIONS.GET_CART,
            payload: noCart,
        });
    };

    const handlePayingBlogs = (blogs) => {
        dispatch({
            type: BLOG_ACTIONS.GET_PAYING_BLOGS,
            payload: blogs,
        });
    };

    const payForBlogs = async (blogs) => {
        let cart = JSON.parse(localStorage.getItem("cart"));

        const newBlogs = blogs?.map((blog) => {
            return { ...blog, promotionDate: Date.now() };
        });
        let tempBlogs = newBlogs.concat(state.promotionBlogs);
        dispatch({
            type: BLOG_ACTIONS.ADD_PROMOTION_BLOG,
            payload: tempBlogs,
        });
        const newLoggedUser = { ...logged, promotionBlogs: tempBlogs };
        changeLoggedUser(newLoggedUser);
        localStorage.setItem("user", JSON.stringify(newLoggedUser));

        const author = await axios.patch(
            `${JSON_API_USERS}/${blogs[0].authorsId}`,
            newLoggedUser
        );

        blogs.map(async (blog) => {
            const changedBlog = { ...blog, priority: 3 };

            const { data } = await axios.patch(
                `${JSON_API_BLOGS}/${blog.id}`,
                changedBlog
            );
            const res = await axios(`${JSON_API_USERS}/${blog.authorsId}`);

            const array = res.data.usersBlogs.map((usersBlog) => {
                if (blog.id === usersBlog.id) {
                    return changedBlog;
                } else {
                    return usersBlog;
                }
            });
            const changedUser = { ...res.data, usersBlogs: array };

            const a = await axios.patch(
                `${JSON_API_USERS}/${blog.authorsId}`,
                changedUser
            );
        });
        const newChangedBlogs = await axios(`${JSON_API_BLOGS}`);

        dispatch({
            type: BLOG_ACTIONS.GET_BLOGS_DATA,
            payload: newChangedBlogs,
        });

        deleteCart();
    };

    const renderPromotionBlogs = (promotionBlogs) => {
        dispatch({
            type: BLOG_ACTIONS.GET_PROMOTIONS_DATA,
            payload: promotionBlogs,
        });
    };

    const addLike = async (blog) => {
        const { data } = await axios(`${JSON_API_BLOGS}/${blog.id}`);

        const idToFind = data.usersLikes.filter((like) => like === logged.id);
        let likes = [...data.usersLikes];
        if (idToFind.length === 0) {
            likes.push(logged.id);
        } else {
            likes = likes.filter((usersId) => usersId !== logged.id);
        }

        const newBlog = { ...data, usersLikes: likes };
        const arr = await axios.patch(`${JSON_API_BLOGS}/${blog.id}`, newBlog);

        getBlogsData();
        getBlogDetails(blog.id);
    };

    const addComment = async (comment, blog) => {
        let newComments = [...blog.comments];
        newComments.push({
            authorsEmail: logged.email,
            comment: comment,
            id: Date.now(),
            blogId: blog.id,
        });
        let newBlog = { ...blog, comments: newComments };
        const { data } = await axios.patch(
            `${JSON_API_BLOGS}/${blog.id}`,
            newBlog
        );
        getBlogDetails(data.id);
    };

    const deleteComment = async (comment, blogDetails) => {
        let commentsWithoutComment = blogDetails.comments.filter(
            ({ id }) => id !== comment.id
        );
        let blogWithoutComment = {
            ...blogDetails,
            comments: commentsWithoutComment,
        };
        const asd = await axios.patch(
            `${JSON_API_BLOGS}/${blogDetails.id}`,
            blogWithoutComment
        );
        getBlogDetails(blogDetails.id);
    };

    const editComment = async (comment, blogDetails, newComment) => {
        let editedComment = { ...comment, comment: newComment };
        let commentsWithNewComment = blogDetails.comments.map(
            (usersComment) => {
                if (usersComment.id === comment.id) {
                    return editedComment;
                } else {
                    return usersComment;
                }
            }
        );
        let blogWithEditedComment = {
            ...blogDetails,
            comments: commentsWithNewComment,
        };
        const asd = await axios.patch(
            `${JSON_API_BLOGS}/${blogDetails.id}`,
            blogWithEditedComment
        );
        getBlogDetails(blogDetails.id);
    };

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
        promotionBlogs: state.promotionBlogs,
        addBlogToCart,
        cart: state.cart,
        getCart,
        changeBlogCount,
        changeBlogPrice,
        deleteCart,
        changeBlogPrice,
        payForBlogs,
        payingBlogs: state.payingBlogs,
        handlePayingBlogs,
        renderPromotionBlogs,
        addLike,
        addComment,
        deleteComment,
        editComment,
    };
    return (
        <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    );
};

export default BlogContextProvider;
