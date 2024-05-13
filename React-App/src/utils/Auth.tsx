import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function isLoggedIn(): Promise<boolean> {
    try {
        const response = await fetch("http://127.0.0.1:3000/isLoggedIn", {
            credentials: "include"
        });
        // Return true if the status code is 200
        return response.status === 200;
    } catch (error) {
        console.error("Request failed:", error);
        return false;
    }
}

const PrivateRoutes: React.FC = () => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function auth() {
            let loggedIn = await isLoggedIn();
            setAuthenticated(loggedIn);
        }
        auth()
    }, [])

    return authenticated ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;