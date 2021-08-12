import axios from "axios";
import React, { useEffect } from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import { useBlog } from "../../contexts/BlogContext";
import BlogCard from "./BlogCard";
import EditBlog from "./EditBlog";

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

    // useEffect( async() => {
    //     let {data} = await axios()
    // },[])
    return (
        <>
            {user ? (
                user.usersBlogs.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {user?.usersBlogs.map((blog) => (
                            <BlogCard blog={blog} showAuthor={false} />
                        ))}
                        <EditBlog />
                    </div>
                ) : (
                    <h1 style={{ color: "#caedc5", fontFamily: "nunito" }}>
                        Похоже у вас нет блогов
                    </h1>
                )
            ) : (
                ""
            )}
        </>
    );
};

export default MyBlog;
