import React, { useEffect } from "react";
import { useBlog } from "../../contexts/BlogContext";
import BlogCard from "./BlogCard";
import EditBlog from "./EditBlog";

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
    console.log(blogs);
    return (
        <>
            {blogs.length > 0 ? (
                <>
                    {adminsBlogs.map((blog) => (
                        <BlogCard blog={blog} />
                    ))}
                    {usersBlogs.map((blog) => (
                        <BlogCard blog={blog} />
                    ))}
                </>
            ) : (
                <div>Похоже здесь нет блогов</div>
            )}
            <div>
                <EditBlog />
            </div>
        </>
    );
};

export default BlogList;
