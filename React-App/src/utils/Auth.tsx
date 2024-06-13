import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function isLoggedIn(): Promise<boolean> {
    try {
        const response = await fetch(
            "https://5jcfs1sxsj.execute-api.us-east-2.amazonaws.com/isLoggedIn",
            {
                credentials: "include",
            }
        );
        // Return true if the status code is 200
        return response.status === 200;
    } catch (error) {
        console.error("Request failed:", error);
        return false;
    }
}

const PrivateRoutes: React.FC = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        async function auth() {
            let loggedIn = await isLoggedIn();
            setAuthenticated(loggedIn);
            setLoggedIn(false);
        }
        auth();
    }, []);
    // allow redirection only after logged in check is completed
    if (loggedIn) return;

    return authenticated ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
