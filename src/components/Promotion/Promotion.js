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
import PaymentIcon from "@material-ui/icons/Payment";

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
    const { cart, getCart, changeBlogCount } = useBlog();
    const [count, setCount] = useState([]);

    useEffect(() => {
        getCart();
    }, []);

    const handlePayBtn = () => {
        history.push("/payment");
        handlePayingBlogs(cart.blogs);
    };
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
                                        {cart.totalPrice} KGS
                                        <br />
                                        <Button onClick={handlePayBtn}>
                                            <PaymentIcon
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                        </Button>
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <h1 style={{ color: "#caedc5", fontFamily: "nunito" }}>
                    ???????????? ?????????? ?????? ????????????
                </h1>
            )}
        </>
    );
};

export default Promotion;
