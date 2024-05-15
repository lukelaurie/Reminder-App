import React from "react"; // we need this to make JSX compile
import HeaderLink from "./HeaderLink";
import "../../styles/headerStyles.css";

const Header: React.FC = () => {
    return (
        <div className="topNav">
            <h1 className="headerTitle">Appointment Manager</h1>
            <HeaderLink />
        </div>
    );
};

export default Header;