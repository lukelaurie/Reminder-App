
import { useState } from "react";



function CreateAccountForm() {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the username change
    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the confirmPassword change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || password === "" || password != confirmPassword) {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
            fetch("http://127.0.0.1:3000/add_new_associate", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name
                })
            }).then((res) => {
                console.log(res)
            })
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? "" : "none",
                }}
            >
                <h1>Please enter all the fields</h1>
            </div>
        );
    };


    return (<div>
        <form>
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
            <label htmlFor="username">Username: </label>
            <input
                onChange={handleUsername}
                className="input"
                value={username}
                type="text"
                id="username"
            />
            <label htmlFor="name">Name: </label>
            <input
                onChange={handleName}
                className="input"
                value={name}
                type="text"
                id="name"
            />
            <label htmlFor="password">Password: </label>
            <input
                onChange={handlePassword}
                className="input"
                value={password}
                type="password"
                id="password"
            />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
                onChange={handleConfirmPassword}
                className="input"
                value={confirmPassword}
                type="password"
                id="confirmPassword"
            />
            <button onClick={handleSubmit} className="btn" type="submit">
                Submit
            </button>
        </form>
    </div>);
}

export default CreateAccountForm;