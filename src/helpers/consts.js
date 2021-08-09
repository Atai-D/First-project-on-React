export const JSON_API_USERS = "http://localhost:8000/users";
export const JSON_API_BLOGS = "http://localhost:8000/blogs";

export const BLOG_LIMIT = 3;

export const CATEGORIES = [
    { value: "arts", label: "arts" },
    { value: "parks", label: "parks" },
    { value: "entertainment", label: "entertainment" },
];

export const ACTIONS = {
    SET_USER: "SET_USER",
    CHANGE_LOGGED: "CHANGE_LOGGED",
};

export const BLOG_ACTIONS = {
    ADD_BLOG: "ADD_BLOG",
    GET_BLOG_DETAILS: "GET_BLOG_DETAILS",
    GET_BLOGS_DATA: "GET_BLOGS_DATA",
    DELETE_BLOG_DETAILS: "DELETE_BLOG_DETAILS",
    ISEDITTING_USER: "ISEDITTING_USER",
};
