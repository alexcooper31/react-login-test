import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputGroup from '../../Components/InputGroup';
import { PrimaryButton, SecondaryButton } from '../../Components/StyledButton';
import LocalDB from '../../services/LocalDB';
import './style.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [unmatchedPassword, setUnmatchedPassword] = useState(false);
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setUnmatchedPassword(false);
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
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
    if (password !== confirmPassword) {
      setUnmatchedPassword(true);
      return;
    }

    if (!emailError && !passwordError && !unmatchedPassword) {
      const localUsers = localStorage.getItem('app-users');
      let parsedUsers = [];
      if  (localUsers) {
        parsedUsers = JSON.parse(localUsers);
      }
      LocalDB.saveItem('app-users', JSON.stringify([...parsedUsers, { email, password  }]));

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setToast(true);
    }
  };

  return (
    <div className="signupContainer">

      <Snackbar open={toast} autoHideDuration={3000} onClose={() => setToast(false)}>
        <Alert onClose={() => setToast(false)} severity="success" sx={{ width: '100%' }}>
          Account Created!
        </Alert>
      </Snackbar>

      <form onSubmit={handleSignUp}>
        <div className='inputContainer'>
          <InputGroup
            title="Email:"
            inputValue={email}
            setChange={handleEmail}
            placeholder='Type an email'
            error={emailError}
            errorMessage='Please enter a valid email address'
          />

          <InputGroup
            title="Password:"
            inputValue={password}
            setChange={handlePassword}
            type="password"
            placeholder='Type a password'
            error={passwordError}
            errorMessage='Please type a password'
          />

          <InputGroup
            title="Password Confirmation:"
            inputValue={confirmPassword}
            setChange={handleConfirmPassword}
            type="password"
            placeholder='Repeat the password'
            error={unmatchedPassword}
            errorMessage='The passwords do not match'
          />

        </div>
        <div className='buttonsContainer'>
          <PrimaryButton title='Create Account' />
          <SecondaryButton title='Home' submit={() => navigate('/')} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
