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
                <img src="forest.jpg" alt="login-image" className="forest-image forest-image-login" />
                <img src="PlanPerfectLogo.png" alt="titleImage" className="top-title-image" />
                <div className="overlay-text">
                    <h1 className="large-image-text">Manage with Ease</h1>
                    <h2 className="medium-image-text">Streamline your appointments and ensure timely notifications for your clients.</h2>
                </div>
            </div>
            <div className="login-form">
                <img src="PlanPerfectLogo.png" alt="titleImage" className="title-image" />
                <h1 className="form-header">Login</h1>
                <div className="register-container">
                    <p className="register-question">Don't have an account?</p> 
                    <a href="/register" className="register-link">Get Plan Perfect Now</a>
                </div>
                <LoginForm onSubmit={loginCall} />
            </div>
        </div>
    );
};

export default Login;
