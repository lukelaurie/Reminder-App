import { useState } from 'react'; // we need this to make JSX compile

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
            <form className='accountForm'>
                <label htmlFor='username'>Username: </label>
                <input type='text' id='username' placeholder='Enter username' className='accountFormInput' required onChange={handleUsernameChange} />

                <label htmlFor='password'>Password: </label>
                <input type='password' id='password' placeholder='Enter password' className='accountFormInput' required onChange={handlePasswordChange} />

                <input type="submit" onClick={(event) => onSubmit(username, password, event)} />
            </form>
        </>
    );
}

export default LoginForm;