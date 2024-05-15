import React from 'react'; // we need this to make JSX compile
import AccountForm from "../CreateAccount/AccountForm";

const CreateAccount: React.FC = () => {

    const createAccount = (username: string, companyName: string, name: string, phoneNumber: string, password: string, confirmPassword: string, event: React.FormEvent): void => {
        event.preventDefault();
        //TODO validate the rest of the form inputs phone number, etc
        if (!username || !password || !confirmPassword || !phoneNumber || !name || !companyName) {
            alert("Please fill out all fields.");
            return;
        }
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
        console.log("Account created!");
        console.log(accountData);
        fetch("http://127.0.0.1:3000/addAssociate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(accountData),
        }).then((response) => {
            return response.text();
        }).then((data) => {
            console.log(data);
        })
    }
    return (
        <>
            <h1>Create Account</h1>
            <AccountForm onSubmit={createAccount} />
        </>
    );
}

export default CreateAccount;