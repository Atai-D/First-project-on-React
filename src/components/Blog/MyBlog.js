import React from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import BlogCard from "./BlogCard";

const MyBlog = () => {
    const { logged, setLogged } = useAutho();

    let user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return (
        <>
            {user ? (
                <div>
                    {user?.usersBlogs.map((blog) => (
                        <BlogCard blog={blog} />
                    ))}
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default MyBlog;
