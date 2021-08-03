import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <NavLink exact to="/">
                <Typography variant="h6" className={classes.title}>
                    Go home /
                </Typography>
            </NavLink>
            <NavLink to="/signup">
                <Typography variant="h6" className={classes.title}>
                    Sign up
                </Typography>
            </NavLink>
        </>
    );
}
