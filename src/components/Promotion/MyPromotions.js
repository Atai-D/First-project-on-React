import React, { useEffect } from "react";
import { useAutho } from "../../contexts/AuthorizationContext";
import { useBlog } from "../../contexts/BlogContext";

const MyPromotions = () => {
    const { logged } = useAutho();
    const { promotionBlogs, renderPromotionBlogs } = useBlog();
    // const checkData = (date, days) => {
    //     if(new Date(Date.now()).getTime() -
    //     new Date(blog.date).getTime())
    // }
    useEffect(() => {
        renderPromotionBlogs(logged.promotionBlogs);
        console.log(promotionBlogs);
    }, []);

    return (
        <>
            {promotionBlogs.length > 0 ? (
                promotionBlogs.map((blog) => (
                    <h1>
                        Title: {blog.title}
                        {/* {new Date(Date.now()).getTime() -
                        new Date(blog.date).getTime()} */}
                        <br />
                        Left:
                        {Math.floor(
                            (blog.days * 1000 * 3600 * 24 +
                                blog.date -
                                Date.now()) /
                                86400000
                        )}
                        days
                        {console.log(blog)}
                    </h1>
                ))
            ) : (
                <h1>Похоже у вас нет продвигаемых блогов</h1>
            )}
        </>
    );
};

export default MyPromotions;
