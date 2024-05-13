import React from "react"; // we need this to make JSX compile
import LoginForm from "../login/LoginForm";

const Login: React.FC = () => {
    const loginCall = (
        username: string,
        password: string,
        event: React.FormEvent
    ): void => {
        event.preventDefault();
        if (!username || !password) {
            alert("Please fill out all fields");
            return;
        }
        let accountData = {
            username: username,
            password: password,
        };
        console.log("Sending Login Request!");
        console.log(accountData);
        // make a request to the backend with the given login information
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                // checks if the data was valid
                if (data === "valid") {
                    // redirect to the home page 
                    window.location.href = "/";
                    alert("login successful");
                } else {
                    alert(data);
                }
            });
    };
    return (
        <>
            <h1>Login</h1>
            <LoginForm onSubmit={loginCall} />
        </>
    );
};

export default Login;
