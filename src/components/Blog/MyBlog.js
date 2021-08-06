import React, { useEffect } from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import { useBlog } from "../../contexts/BlogContext";
import BlogCard from "./BlogCard";

const MyBlog = () => {
    const { logged, setLogged } = useAutho();

    const { history } = useBlog();

    // useEffect(() => {
    //     let user = JSON.parse(localStorage.getItem("user"));
    //     console.log(logged);
    //     if (!user) {
    //         alert("Зарегистрируйтесь, чтобы увидеть свои блоги");
    //         history.push("/");
    //     }
    // }, [logged]);

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
