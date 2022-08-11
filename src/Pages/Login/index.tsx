import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputGroup from '../../Components/InputGroup';
import { PrimaryButton, SecondaryButton } from '../../Components/StyledButton';
import LocalDB from '../../services/LocalDB';
import { IUser } from '../../types';
import './style.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [appUsers, setAppUsers] = useState<IUser[]>([]);
  const [loginError, setLoginError] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorized = LocalDB.retrieveString('app-auth');
    console.log(isAuthorized);
    if (isAuthorized && isAuthorized === 'true') {
      navigate('/');
    }

    const localUsers = LocalDB.retrieveString('app-users');
    if  (localUsers) {
      setAppUsers(JSON.parse(localUsers));
    }
  }, []);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
    setLoginError(false);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setLoginError(false);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailTest = /\S+@\S+\.\S+/.test(email);

    if  (email === '') {
      setEmailError(true);
      return;
    } else {
      if (!emailTest) {
        setEmailError(true);
        return;
      }
    }

    if  (password === '' ) {
      setPasswordError(true);
      return;
    }

    const authCheck = appUsers.filter((e) => {
      if (e.email === email && e.password === password) return true;
      else return false;
    });

    if (authCheck.length > 0) {
      navigate('/');
      localStorage.setItem('app-auth', 'true');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleLogin}>
        <div className='inputContainer'>
          <InputGroup
            title="Email:"
            inputValue={email}
            setChange={handleEmail}
            placeholder='Email'
            error={emailError}
            errorMessage='Please type a valid email'
          />

          <InputGroup
            title="Password:"
            inputValue={password}
            setChange={handlePassword}
            type="password"
            placeholder='Password'
            error={passwordError}
            errorMessage='Please type a password'
          />

          { !loginError || 'Invalid Credentials' }
        </div>
        <div className='buttonsContainer'>
          <PrimaryButton title="Log In" type='submit' />
          <SecondaryButton title='Create Account' submit={() => navigate('/signup')} />
        </div>
      </form>
    </div>
  );
};

export default Login;
