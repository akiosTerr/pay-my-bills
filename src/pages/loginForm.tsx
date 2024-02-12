import { useState } from 'react';
import { LoginData } from 'api_actions/interfaces/api_interfaces';
import { isValidEmail } from 'utils/general_utils';
import { getLoginToken } from 'api_actions/auth';
import 'style/ItemForm.scss'

type LoginFormType = {
    login: Function
}

function LoginForm({login}:LoginFormType) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const validateFields = () => {
        const fields = [email, password]
        const textFieldCheck = fields.some(item => item.length < 2)
        const validEmail = isValidEmail(email)
        return textFieldCheck || !validEmail
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        const loginData: LoginData = {
            email,
            password
        }
        console.log('test')
        getLoginToken(loginData,login)
    }

    return (
        <form onSubmit={onSubmitHandler} className="add-item-form login-form">
            <h1 className="form-title">
                Enter your account information
            </h1>
            <label className="label item-title">
                email:
            </label>
            <input value={email} onChange={onChangeEmail} className="input-text title-input" type="text" name="email" id="email-input" />
            <label className="label item-title">
                password:
            </label>
            <input type="password" value={password} onChange={onChangePassword} className="input-text title-input" name="password" id="billCategory-input" />
            <button disabled={validateFields()} className="submit-button" type="submit" value="Submit">
                login
            </button>
        </form>
    );
}

export default LoginForm;