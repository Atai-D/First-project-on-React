import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAutho } from "../../contexts/AuthorizationContext";
import SignUp from "../Authorization/SignUp";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Link from "@material-ui/core/Link"
import { Grid } from "@material-ui/core";


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
    const { setSignModal, user } = useAutho();

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
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
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

        <Link component="button"
                variant="body2"
                className={classes.links}
                style={{ color: "#bfe0c2"}}
                onClick={() => {
                console.info("I'm a button.");
                }}
                >
                Food and Drinks
                </Link>
            <Link component="button"
                    className={classes.links}
                    variant="body2"
                    onClick={() => {
                    console.info("I'm a button.");
                    }}
                        >
                Art and Culture
                    </Link>

            <Link component="button"
                    variant="body2"
                    className={classes.links}
                    onClick={() => {
                    console.info("I'm a button.");
                    }}>
            Things to Do
            </Link>

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {/* <AccountCircle /> */}
                    <Button onClick={() => setSignModal(true)}>Sign Up</Button>
                    <Button onClick={() => setSignModal(true)}>Log in</Button>
                </IconButton>
                {/* <p>Profile</p> */}
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ backgroundColor: "#bfe0c2" }}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                      Welcome to B B-Blog
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                         </div>
                    </div> 
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Link component="button"
                                // variant="body2"
                                style={{ color: "#fff", marginRight: "10px"}}

                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                                >
                                Food and Drinks
                        </Link>
                        <Link component="button"
                                // variant="body2"
                                style={{ color: "#fff", marginRight: "10px"}}
                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                                >
                                Art and Culture
                                </Link>

                        <Link component="button"
                                // variant="body2"
                                style={{ color: "#fff", marginRight: "10px"}}
                                onClick={() => {
                                    console.info("I'm a button.");
                                }}
                                >
                                Things to Do
                                </Link>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            // onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/* <AccountCircle /> */}

                            <Button className={classes.btn} onClick={() => setSignModal(true)}>
                                Sign Up
                            </Button>
                            <Button className={classes.btn} onClick={() => setSignModal(true)}>

                                Log in
                            </Button>
                        </IconButton>
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
        </div>
    );
}