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
            {promotionBlogs.map((blog) => (
                <h1>
                    {blog.item.title}
                    {new Date(Date.now()).getTime() -
                        new Date(blog.date).getTime()}
                    {console.log(
                        new Date(Date.now()).getTime(),
                        new Date(blog.date).getTime()
                    )}
                    {}
                </h1>
            ))}
        </>
    );
};

export default MyPromotions;
