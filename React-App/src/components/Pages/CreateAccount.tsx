import React, { useState, useEffect } from "react"; // we need this to make JSX compile
import AccountForm from "../CreateAccount/AccountForm";
import "../../styles/loginRegister.css";
import CustomAlert from "../General/CustomAlert";

const CreateAccount: React.FC = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize); 
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    if (isMobile) {
        return (
            <div className="mobile-message">
                You need to be on a desktop to use this website.
            </div>
        );
    }

    const createAccount = (
        username: string,
        companyName: string,
        name: string,
        phoneNumber: string | undefined,
        password: string,
        confirmPassword: string,
        event: React.FormEvent
    ): void => {
        event.preventDefault();
        if (
            !username ||
            !password ||
            !confirmPassword ||
            !phoneNumber ||
            !name ||
            !companyName
        ) {
            setAlertMessage("Please fill out all fields.");
            return;
        }
        // modify the phone number to be in correct format
        phoneNumber = "+1" + phoneNumber.replace(/\D/g, "");
        let pattern = new RegExp("\\+[0-9]{11}");
        if (!pattern.test(phoneNumber)) {
            setAlertMessage("Phone number is invalid.");
            return;
        }
        if (password !== confirmPassword) {
            setAlertMessage("Passwords must match.");
            return;
        }
        let accountData = {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            name: name,
            companyName: companyName,
        };
        fetch(
            "https://5jcfs1sxsj.execute-api.us-east-2.amazonaws.com/addAssociate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(accountData),
            }
        )
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                if (data === "The new user has been placed!") {
                    // redirect to the home page
                    setAlertMessage("Account Created.");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1500);
                } else {
                    setAlertMessage(data);
                }
            });
    };

    return (
        <div className="login-container">
            {alertMessage !== "" && (
                <CustomAlert message={alertMessage} onClose={() => setAlertMessage("")} />
            )}
            {/* left hand panel */}
            <div className="login-image">
                <img
                    src="forest.jpg"
                    alt="login-image"
                    className="forest-image forest-image-register"
                />
                <img
                    src="PlanPerfectLogo.png"
                    alt="titleImage"
                    className="top-title-image"
                />
                <div className="overlay-text">
                    <h1 className="large-image-text">Manage with Ease</h1>
                    <h2 className="medium-image-text">
                        Streamline your appointments and ensure timely
                        notifications for your clients.
                    </h2>
                </div>
            </div>
            {/* right hand panel where user can login */}
            <div className="login-form">
                <img
                    src="PlanPerfectLogo.png"
                    alt="titleImage"
                    className="title-image"
                />
                <h1 className="form-header">Create Your Account</h1>
                <AccountForm onSubmit={createAccount} />
            </div>
        </div>
    );
};

export default CreateAccount;
