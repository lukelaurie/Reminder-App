import React from "react"; // we need this to make JSX compile
import HeaderLink from "./HeaderLink";
import "../../styles/headerStyles.css";

const Header: React.FC = () => {
    return (
        <div className="top-nav">
            <img src="PlanPerfectLogo.png" alt="titleImage" className="title-logo" />
            <HeaderLink />
        </div>
    );
};

export default Header;