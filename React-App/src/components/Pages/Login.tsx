import React from "react"; // we need this to make JSX compile
import LoginForm from "../Login/LoginForm";
import "../../styles/loginRegister.css";

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
        // make a request to the backend with the given login information
        fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
            credentials: "include",
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                // checks if the data was valid
                if (data === "valid") {
                    // redirect to the home page
                    window.location.href = "/";
                    // alert("login successful");
                } else {
                    alert(data);
                }
            });
    };
    return (
        <div className="login-container">
            <div className="login-image">
                <img src="forest.jpg" alt="loginImage" className="forest-image" />
            </div>
            <div className="login-form">
                <img src="PlanPerfectLogo.png" alt="titleImage" className="title-image" />
                <LoginForm onSubmit={loginCall} />
            </div>
        </div>
    );
};

export default Login;
