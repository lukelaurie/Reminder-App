import React from "react"; // we need this to make JSX compile

const HeaderLink: React.FC = () => {
    return (
        <span className="topLink">
            <a href="/">Home</a>
            <a href="/appointments">Appointments</a>
            <a href="/help">Help</a>
        </span>
    );
};

export default HeaderLink;