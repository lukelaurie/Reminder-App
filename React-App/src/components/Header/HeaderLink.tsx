import React from "react"; // we need this to make JSX compile
import { NavLink } from "react-router-dom";
import "../../styles/headerStyles.css";

const HeaderLink: React.FC = () => {
    return (
        <span className="top-link">
            <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? "large-nav register-link active" : "large-nav register-link"}>Home</NavLink>
            <NavLink to="/appointments" className={({ isActive }: { isActive: boolean }) => isActive ? "large-nav register-link active" : "large-nav register-link"}>Appointments</NavLink>
            <NavLink to="/help" className={({ isActive }: { isActive: boolean }) => isActive ? "large-nav register-link active" : "large-nav register-link"}>Help</NavLink>
        </span>
    );
};

export default HeaderLink;