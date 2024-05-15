import React from "react"; // we need this to make JSX compile
import Header from "../Header/Header";

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <h1>Home</h1>
        </>
    );
};

export default Home;