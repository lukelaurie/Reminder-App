import { useState } from 'react'; // we need this to make JSX compile

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
            <form className='accountForm'>
                <label htmlFor='username'>Username: </label>
                <input type='text' id='username' placeholder='Enter username' className='accountFormInput' onChange={handleUsernameChange} />

                <label htmlFor='companyName'>Company Name: </label>
                <input type='text' id='companyName' placeholder='Enter company name' className='accountFormInput' onChange={handleCompanyNameChange} />

                <label htmlFor='name'>Name: </label>
                <input type='text' id='name' placeholder='Enter name' className='accountFormInput' onChange={handleNameChange} />

                {/* TODO: make it so that the user can only type in numbers and it will auto format */}
                <label htmlFor='phoneNumber'>Phone Number: </label>
                <input type='text' id='phoneNumber' placeholder='Enter phone number' className='accountFormInput' onChange={handlePhoneNumberChange} />

                <label htmlFor='password'>Password: </label>
                <input type='password' id='password' placeholder='Enter password' className='accountFormInput' onChange={handlePasswordChange} />

                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <input type='password' id='confirmPassword' placeholder='Confirm password' className='accountFormInput' onChange={handleConfirmPasswordChange} />

                <input type="submit" onClick={(event) => onSubmit(username, companyName, name, phoneNumber, password, confirmPassword, event)} />
            </form>
        </>
    );
}

export default AccountForm;