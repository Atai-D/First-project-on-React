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
import PromotionCard from "./PromotionCard";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableCellImg: {
        width: 50,
    },
});

const Promotion = () => {
    const classes = useStyles();
    const [value, setValue] = useState(30);
    const { promotionBlogs, history, handlePayingBlogs } = useBlog();
    // promotionBlogs.map(blogsID => (

    // ))
    const { cart, getCart, changeBlogCount } = useBlog();
    const [count, setCount] = useState([]);
    useEffect(() => {
        console.log(1);
        console.log(promotionBlogs);
        console.log(cart);
    }, []);

    useEffect(() => {
        getCart();
    }, []);

    const handleCountChange = (value, id) => {
        changeBlogCount(value, id);
        setValue(value === "" ? "" : Number(value));
    };

    const handlePayBtn = () => {
        history.push("/payment");
        handlePayingBlogs(cart.blogs);
    };

    // const handleCountPrice = (value, id) => {
    //     setCount();
    // };

    // useEffect(() => {
    //     console.log(cart);
    // }, [cart]);

    return (
        <>
            {cart?.blogs?.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">
                                    Price for one day per blog
                                </TableCell>
                                <TableCell align="right">
                                    Days Count (max 30 days)
                                </TableCell>
                                <TableCell align="right">SubPrice</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart?.blogs?.length > 0 &&
                                cart.blogs.map((blog) => (
                                    <PromotionCard blog={blog} />
                                ))}

                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>
                                    <Typography variant="h5">Total:</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h5">
                                        {cart.totalPrice}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button onClick={handlePayBtn}>Оплатить</Button>
                </TableContainer>
            ) : (
                <h1>Похоже здесь нет блогов</h1>
            )}
        </>
    );
};

export default Promotion;
