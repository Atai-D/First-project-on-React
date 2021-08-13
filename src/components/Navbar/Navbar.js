import "bootstrap/dist/css/bootstrap.min.css";
import { useAutho } from "../../contexts/AuthorizationContext";
import SignUp from "../Authorization/SignUp";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button as ButtonUI, Button } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import LogIn from "../Authorization/LogIn";

import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import { AccountCircle } from "@material-ui/icons";
import { BLOG_LIMIT, CATEGORIES } from "../../helpers/consts";

const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
        minWidth: "100vw",
    },
    grow: {
        flexGrow: 1,
        maxWidth: "1500px",
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    btn: {
        backgroundColor: "#fff",
        color: "#bfe0c2",
        marginRight: "5px",
        // border: "none",
        fontFamily: "nunito",
        // borderColor: "gold",

        // fontFamily:"nunito",

        "&:hover": {
            backgroundColor: "#d8f0df",
            color: "#4a825b",
        },
    },
    title: {
        color: "#fff",
    },
    mbMenu: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#bfe0c2",
        textDecoration: "none",
    },
    navLogoutBtn: {
        border: "1px solid white",
        color: "white",

        // borderWidth: "4px",
        // borderColor: "gold",
        // color: "gold"
    },
}));

export default function PrimarySearchAppBar() {
    const location = useLocation();
    const history = useHistory();

    const { setSignModal, logged, logModal, setLogModal, changeLoggedUser } =
        useAutho();

    const { getBlogsData, getCart, deleteCart } = useBlog();

    useEffect(() => {
        getCart();
    }, []);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <></>
        // <Menu
        //     anchorEl={anchorEl}
        //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
        //     id={menuId}
        //     keepMounted
        //     transformOrigin={{ vertical: "top", horizontal: "right" }}
        //     open={isMenuOpen}
        //     onClose={handleMenuClose}
        // >
        //     {/* {CATEGORIES.map((option) => (
        //         <NavLink
        //             style={{
        //                 color: "#d8f0df",
        //             }}
        //             to={option.to}
        //         >
        //             <MenuItem onClick={handleMenuClose}>
        //                 {option.label}
        //             </MenuItem>
        //         </NavLink>
        //     ))} */}
        //     <NavLink
        //         style={{
        //             color: "#d8f0df",
        //         }}
        //         to={`/bloglist?category=art&culture&_limit${BLOG_LIMIT}`}
        //     >
        //         <MenuItem onClick={handleMenuClose}>Art & Culture</MenuItem>
        //     </NavLink>
        //     <NavLink
        //         style={{
        //             color: "#d8f0df",
        //         }}
        //         to={`/bloglist?category=thingsToDo&_limit${BLOG_LIMIT}`}
        //     >
        //         <MenuItem onClick={handleMenuClose}>Thing To Do</MenuItem>
        //     </NavLink>
        //     <NavLink
        //         style={{
        //             color: "#d8f0df",
        //         }}
        //         to={`/bloglist?category=food&drinks&_limit${BLOG_LIMIT}`}
        //     >
        //         <MenuItem onClick={handleMenuClose}>Food & Drinks</MenuItem>
        //     </NavLink>
        // </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem
                className={classes.mbMenu}
                onClick={handleProfileMenuOpen}
            >
                {logged.isLogged ? (
                    <>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                paddingTop: "4px",
                            }}
                            to="/promotion"
                        >
                            Promotion
                        </NavLink>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                paddingTop: "4px",
                            }}
                            to="/mypromotions"
                        >
                            My Promotions
                        </NavLink>
                    </>
                ) : (
                    ""
                )}
                <NavLink
                    style={{
                        color: "#fff",
                        fontSize: "1.25rem",
                        marginRight: "15px",
                        fontFamily: "nunito",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        textDecoration: "none",
                    }}
                    to={`/bloglist?_limit=${BLOG_LIMIT}&_sort=priority&_order=desc`}
                >
                    All blogs
                </NavLink>
                {logged.isLogged ? (
                    <NavLink
                        style={{
                            color: "#fff",
                            fontSize: "1.25rem",
                            marginRight: "15px",
                            fontFamily: "nunito",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            textDecoration: "none",
                        }}
                        to="/myblog"
                    >
                        My Blogs
                    </NavLink>
                ) : (
                    ""
                )}

                {/* <NavLink
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            onClick={handleProfileMenuOpen}
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to={history}
                        >
                            Categories
                        </NavLink> */}
                <NavLink
                    style={{
                        color: "#fff",
                        fontSize: "1.25rem",
                        marginRight: "15px",
                        fontFamily: "nunito",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        textDecoration: "none",
                    }}
                    to="/addblog"
                >
                    Add Blog
                </NavLink>

                {logged.isLogged ? (
                    <>
                        <Button
                            className={classes.navLogoutBtn}
                            onClick={() => {
                                changeLoggedUser({
                                    ...logged,
                                    isLogged: false,
                                });
                                localStorage.removeItem("user");
                                deleteCart();
                                alert("Вы вышли из аккаунта");
                                getBlogsData();
                            }}
                        >
                            Log out
                        </Button>
                        <Typography variant="p">{logged.email}</Typography>
                    </>
                ) : (
                    <div>
                        <ButtonUI
                            className={classes.btn}
                            onClick={() => setSignModal(true)}
                        >
                            Sign Up
                        </ButtonUI>
                        <ButtonUI
                            color="inherit"
                            focusVisible={false}
                            className={classes.btn}
                            onClick={() => setLogModal(true)}
                        >
                            Log in
                        </ButtonUI>
                    </div>
                )}
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.navbar}>
            <AppBar style={{ backgroundColor: "#8ab584", position: "static" }}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.5rem",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            B B-Blog
                        </NavLink>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}></div>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {logged.isLogged ? (
                            <>
                                <NavLink
                                    style={{
                                        color: "#fff",
                                        fontSize: "1.25rem",
                                        marginRight: "15px",
                                        paddingTop: "4px",
                                    }}
                                    to="/promotion"
                                >
                                    Promotion
                                </NavLink>
                                <NavLink
                                    style={{
                                        color: "#fff",
                                        fontSize: "1.25rem",
                                        marginRight: "15px",
                                        paddingTop: "4px",
                                    }}
                                    to="/mypromotions"
                                >
                                    My Promotions
                                </NavLink>
                            </>
                        ) : (
                            ""
                        )}
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to={`/bloglist?_limit=${BLOG_LIMIT}&_sort=priority&_order=desc`}
                        >
                            All blogs
                        </NavLink>
                        {logged.isLogged ? (
                            <NavLink
                                style={{
                                    color: "#fff",
                                    fontSize: "1.25rem",
                                    marginRight: "15px",
                                    fontFamily: "nunito",
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    textDecoration: "none",
                                }}
                                to="/myblog"
                            >
                                My Blogs
                            </NavLink>
                        ) : (
                            ""
                        )}

                        {/* <NavLink
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            onClick={handleProfileMenuOpen}
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to={history}
                        >
                            Categories
                        </NavLink> */}
                        <NavLink
                            style={{
                                color: "#fff",
                                fontSize: "1.25rem",
                                marginRight: "15px",
                                fontFamily: "nunito",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "row",
                                textDecoration: "none",
                            }}
                            to="/addblog"
                        >
                            Add Blog
                        </NavLink>

                        {logged.isLogged ? (
                            <>
                                <Button
                                    className={classes.navLogoutBtn}
                                    onClick={() => {
                                        changeLoggedUser({
                                            ...logged,
                                            isLogged: false,
                                        });
                                        localStorage.removeItem("user");
                                        deleteCart();
                                        alert("Вы вышли из аккаунта");
                                        getBlogsData();
                                        history.push("/");
                                    }}
                                >
                                    Log out
                                </Button>
                                <Typography variant="p">
                                    {logged.email}
                                </Typography>
                            </>
                        ) : (
                            <div>
                                <ButtonUI
                                    className={classes.btn}
                                    onClick={() => setSignModal(true)}
                                >
                                    Sign Up
                                </ButtonUI>
                                <ButtonUI
                                    color="inherit"
                                    focusVisible={false}
                                    className={classes.btn}
                                    onClick={() => setLogModal(true)}
                                >
                                    Log in
                                </ButtonUI>
                            </div>
                        )}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <SignUp />
            <LogIn />
        </div>
    );
}
