import React from 'react'; // we need this to make JSX compile
import AccountForm from "../CreateAccount/AccountForm";
import "../../styles/loginRegister.css";
import { da } from 'date-fns/locale';

const CreateAccount: React.FC = () => {

    const createAccount = (username: string, companyName: string, name: string, phoneNumber: string | undefined, password: string, confirmPassword: string, event: React.FormEvent): void => {
        event.preventDefault();
        if (!username || !password || !confirmPassword || !phoneNumber || !name || !companyName) {
            alert("Please fill out all fields.");
            return;
        }
        // modify the phone number to be in correct format 
        phoneNumber = "+1" + phoneNumber.replace(/\D/g, "");
        console.log(phoneNumber);

        let pattern = new RegExp("\\+[0-9]{11}");
        if (!pattern.test(phoneNumber)) {
            alert("Phone number is invalid.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords must match.");
            return;
        }
        let accountData = {
            "username": username,
            "password": password,
            "phoneNumber": phoneNumber,
            "name": name,
            "companyName": companyName
        }
        fetch("http://127.0.0.1:3000/addAssociate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            if (data === "The new user has been placed!") {
                // redirect to the home page
                alert("Account Created");
                window.location.href = "/login";
            } else {
                alert(data);
            }
        })
    }
    return (
            <div className="login-container">
                <div className="login-image">
                    <img src="forest.jpg" alt="login-image" className="forest-image" />
                    <img src="PlanPerfectLogo.png" alt="titleImage" className="top-title-image" />
                    <div className="overlay-text">
                        <h1 className="large-image-text">Manage with Ease</h1>
                        <h2 className="medium-image-text">Streamline your appointments and ensure timely notifications for your clients.</h2>
                    </div>
                </div>
                <div className="login-form">
                    <img src="PlanPerfectLogo.png" alt="titleImage" className="title-image" />
                    <h1 className="form-header">Create Your Account</h1>
                    <AccountForm onSubmit={createAccount} />
                </div>
            </div>
    );
}

export default CreateAccount;