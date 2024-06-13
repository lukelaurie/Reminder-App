import { useState } from 'react'; // we need this to make JSX compile
import "../../styles/loginRegister.css";

interface Props {
    onSubmit: (username: string, password: string, event: React.FormEvent) => void;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <>
            <form className='form-container'>
                <input type='text' id='username' placeholder='Enter username' className='account-form-input' required onChange={handleUsernameChange} />

                <input type='password' id='password' placeholder='Enter password' className='account-form-input' required onChange={handlePasswordChange} />

                <input type="submit" value="SIGN IN" className='register-submit' onClick={(event) => onSubmit(username, password, event)} />
            </form>
        </>
    );
}

export default LoginForm;