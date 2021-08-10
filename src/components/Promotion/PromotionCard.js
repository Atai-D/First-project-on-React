import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    makeStyles,
    TableRow,
    Slider,
    Grid,
    Input,
    Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useBlog } from "../../contexts/BlogContext";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableCellImg: {
        width: 50,
    },
});

const PromotionCard = ({ blog }) => {
    const classes = useStyles();
    const [days, setDays] = useState(blog.days);
    const [price, setPrice] = useState(blog.promPrice);
    const { promotionBlogs } = useBlog();
    const { cart, getCart, changeBlogCount, changeBlogPrice, addBlogToCart } =
        useBlog();

    useEffect(() => {
        console.log(promotionBlogs);
    }, []);

    // changeBlogCount(value, id);
    // handleCountChange
    const handleCountChange = (e) => {
        const res = eval(`${days}${e.target.innerText}`);
        setDays(res);
        changeBlogCount(res, blog.item.id);
        console.log(blog);
    };

    // useEffect(() => {
    //     getCart();
    // }, []);

    const handlePriceChange = (e) => {
        const res = eval(`${price}${e.target.innerText}`);
        changeBlogPrice(res, blog.item.id);
        setPrice(res);
    };

    return (
        <TableRow key={blog.item.id}>
            <TableCell>
                <img
                    className={classes.tableCellImg}
                    src={blog.item.image}
                    alt={blog.item.title}
                />
            </TableCell>
            <TableCell align="right">
                <Button onClick={() => addBlogToCart(blog.item)}>Remove</Button>
                {blog.item.title}
            </TableCell>
            <TableCell align="right">
                {/* <input
                    type="number"
                    value={blog.count}
                    onChange={(e) =>
                        handleCountChange(e.target.value, blog.item.id)
                    }
                /> */}
                <Button
                    onClick={handlePriceChange}
                    disabled={price - 10 < 1 ? "disabled" : ""}
                >
                    -10
                </Button>
                <Button
                    onClick={handlePriceChange}
                    disabled={price - 2 < 1 ? "disabled" : ""}
                >
                    -2
                </Button>
                {price} KGS
                <Button
                    onClick={handlePriceChange}
                    disabled={price + 2 > 40 ? "disabled" : ""}
                >
                    +2
                </Button>
                <Button
                    onClick={handlePriceChange}
                    disabled={price + 10 > 40 ? "disabled" : ""}
                >
                    +10
                </Button>
            </TableCell>
            <TableCell align="right">
                {/* <input
                                                type="number"
                                                value={blog.count}
                                                onChange={(e) =>
                                                    handleCountChange(
                                                        e.target.value,
                                                        blog.item.id
                                                    )
                                                }
                                            /> */}
                <Button
                    onClick={handleCountChange}
                    disabled={days - 5 < 1 ? "disabled" : ""}
                >
                    -5
                </Button>
                <Button
                    onClick={handleCountChange}
                    disabled={days - 1 < 1 ? "disabled" : ""}
                >
                    -1
                </Button>
                {days} days
                <Button
                    onClick={handleCountChange}
                    disabled={days + 1 > 30 ? "disabled" : ""}
                >
                    +1
                </Button>
                <Button
                    onClick={handleCountChange}
                    disabled={days + 5 > 30 ? "disabled" : ""}
                >
                    +5
                </Button>
            </TableCell>
            <TableCell align="right">{blog.subPrice}</TableCell>
        </TableRow>
    );
};

export default PromotionCard;
