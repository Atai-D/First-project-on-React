import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div style={{ marginBottom: "100px", display: "flex" }}>
            <NavLink exact to="/">
                <h2>Go home / </h2>
            </NavLink>
            <NavLink to="/signup">
                <h2> Sign up</h2>
            </NavLink>
        </div>
    );
};

export default Navbar;
