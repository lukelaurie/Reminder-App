import { useState } from "react"; // we need this to make JSX compile
import "../../styles/loginRegister.css";
import PhoneNumberInput from "./PhoneNumberInput";

interface Props {
    onSubmit: (
        username: string,
        companyName: string,
        name: string,
        phoneNumber: string | undefined,
        password: string,
        confirmPassword: string,
        event: React.FormEvent
    ) => void;
}

const AccountForm: React.FC<Props> = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

    const handlePhoneNumberChange = (value: string | undefined) => {
        setPhoneNumber(value);
    };

    return (
        <>
            <form className="form-container">
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    className="account-form-input"
                    required
                    onChange={(event) => setUsername(event.target.value)}
                />

                <input
                    type="text"
                    id="companyName"
                    placeholder="Enter company name"
                    className="account-form-input"
                    required
                    onChange={(event) => setCompanyName(event.target.value)}
                />

                <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    className="account-form-input"
                    required
                    onChange={(event) => setName(event.target.value)}
                />

                <PhoneNumberInput
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    phoneType="register"
                />

                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    className="account-form-input"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                />

                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    className="account-form-input"
                    required
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />

                <input
                    type="submit"
                    value="Register"
                    className="register-submit"
                    onClick={(event) =>
                        onSubmit(username, companyName, name, phoneNumber, password, confirmPassword, event)
                    }
                />
            </form>
        </>
    );
};

export default AccountForm;
