import { useState } from 'react'; // we need this to make JSX compile
import "../../styles/loginRegister.css";

interface Props {
    onSubmit: (username: string, companyName: string, name: string, phoneNumber: string, password: string, confirmPassword: string, event: React.FormEvent) => void;
}

const AccountForm: React.FC<Props> = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompanyName(event.target.value);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    return (
        <>
            <form className='form-container'>
                <input type='text' id='username' placeholder='Enter username' className='account-form-input' required onChange={handleUsernameChange} />

                <input type='text' id='companyName' placeholder='Enter company name' className='account-form-input' required onChange={handleCompanyNameChange} />

                <input type='text' id='name' placeholder='Enter name' className='account-form-input' required onChange={handleNameChange} />

                <input type='text' id='phoneNumber' placeholder='Enter phone number' className='account-form-input' required onChange={handlePhoneNumberChange} />

                <input type='password' id='password' placeholder='Enter password' className='account-form-input' required onChange={handlePasswordChange} />

                <input type='password' id='confirmPassword' placeholder='Confirm password' className='account-form-input' required onChange={handleConfirmPasswordChange} />

                <input type="submit" value="Register" className='register-submit' onClick={(event) => onSubmit(username, companyName, name, phoneNumber, password, confirmPassword, event)} />
            </form>
        </>
    );
}

export default AccountForm;