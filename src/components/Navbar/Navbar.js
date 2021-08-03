import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <NavLink exact to="/">
                Go home /
            </NavLink>
            <NavLink to="/signup">Sign up</NavLink>
        </div>
    );
}
