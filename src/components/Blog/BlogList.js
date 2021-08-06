import React, { useEffect } from "react";
import { useBlog } from "../../contexts/BlogContext";
import BlogCard from "./BlogCard";

const BlogList = () => {
    const { blogs, getBlogsData } = useBlog();
    useEffect(() => {
        getBlogsData();
    }, []);
    let adminsBlogs = [];
    let usersBlogs = [];
    blogs.forEach((blog) =>
        blog.isAdminWrote ? adminsBlogs.push(blog) : usersBlogs.push(blog)
    );
    return (
        <>
            {adminsBlogs.map((blog) => (
                <BlogCard blog={blog} />
            ))}
            {usersBlogs.map((blog) => (
                <BlogCard blog={blog} />
            ))}
        </>
    );
};

export default BlogList;
