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
    return (
        <>
            {user ? (
                user.usersBlogs.length > 0 ? (
                    <div>
                        {user?.usersBlogs.map((blog) => (
                            <BlogCard blog={blog} showAuthor={false} />
                        ))}
                    </div>
                ) : (
                    "Похоже у вас нет блогов"
                )
            ) : (
                ""
            )}
        </>
    );
};

export default MyBlog;
