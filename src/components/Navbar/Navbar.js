import { Button, Modal, Nav } from "react-bootstrap";
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
import MoreIcon from "@material-ui/icons/MoreVert";
import LogIn from "../Authorization/LogIn";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    }, 
    links: {
        color: "#bfe0c2",
        marginRight: "5px"

    },
    // inputRoot: {
    //     color: "inherit",
    // },
    // inputInput: {
    //     padding: theme.spacing(1, 1, 1, 0),
    //     // vertical padding + font size from searchIcon
    //     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //     transition: theme.transitions.create("width"),
    //     width: "100%",
    //     [theme.breakpoints.up("md")]: {
    //         width: "20ch",
    //     },
    // },
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
        border: "none",
    },


}));

export default function PrimarySearchAppBar() {
    const { setSignModal, logged, setLogged, user, logModal, setLogModal } =
        useAutho();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLogged(user);
        }
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

    // const menuId = "primary-search-account-menu";
    // const renderMenu = (
    //     <Menu
    //         anchorEl={anchorEl}
    //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //         id={menuId}
    //         keepMounted
    //         transformOrigin={{ vertical: "top", horizontal: "right" }}
    //         open={isMenuOpen}
    //         onClose={handleMenuClose}
    //     >
    //         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //         <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //     </Menu>
    // );

    // const mobileMenuId = "primary-search-account-menu-mobile";
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{ vertical: "top", horizontal: "right" }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >

    //     <Link component="button"
    //             variant="body2"
    //             className={classes.links}
    //             style={{ color: "#bfe0c2"}}
    //             onClick={() => {
    //             console.info("I'm a button.");
    //             }}
    //             >
    //                 <Link to="/addblog">Add Blog</Link>
    //                 {/* <Badge badgeContent={11} color="secondary"> */}
    //                 {/* <NotificationsIcon /> */}
    //                 {/* </Badge> */}
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem>
    //         <MenuItem onClick={handleProfileMenuOpen}>
    //             <IconButton
    //                 aria-label="account of current user"
    //                 aria-controls="primary-search-account-menu"
    //                 aria-haspopup="true"
    //                 color="inherit"
    //             >
    //                 {/* <AccountCircle /> */}
    //                 <Button onClick={() => setSignModal(true)}>Sign Up</Button>
    //                 <Button onClick={() => setLogModal(true)}>Log in</Button>
    //             </IconButton>
    //             {/* <p>Profile</p> */}
    //         </MenuItem>
    //     </Menu>
    // );

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ backgroundColor: "#bfe0c2" }}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink to="/">B B-Blog</NavLink>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}></div>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-label="show 4 new mails"
                            color="inherit"
                        >
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            aria-label="show 11 new notifications"
                            color="inherit"
                        >
                            <NavLink to="/myblog">My Blogs</NavLink>
                        </IconButton>
                        <IconButton
                            aria-label="show 11 new notifications"
                            color="inherit"
                        >
                            <NavLink to="/">Home</NavLink>
                            {/* <Badge badgeContent={11} color="secondary"> */}
                            {/* <NotificationsIcon /> */}
                            {/* </Badge> */}
                        </IconButton>
                        <IconButton
                            aria-label="show 11 new notifications"
                            color="inherit"
                        >
                            <NavLink to="/addblog">Add Blog</NavLink>
                            {/* <Badge badgeContent={11} color="secondary"> */}
                            {/* <NotificationsIcon /> */}
                            {/* </Badge> */}
                        </IconButton>

                        {/* {console.log(logged)} */}
                        {logged.isLogged ? (
                            <>
                                <Button
                                    onClick={() => {
                                        setLogged({
                                            ...logged,
                                            isLogged: false,
                                        });
                                        localStorage.removeItem("user");
                                        alert("Вы вышли из аккаунта");
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
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    // aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Button
                                        className={classes.btn}
                                        onClick={() => setSignModal(true)}
                                    >
                                        Sign Up
                                    </Button>
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    // aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Button
                                        className={classes.btn}
                                        onClick={() => setLogModal(true)}
                                    >
                                        Log in
                                    </Button>
                                </IconButton>
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
