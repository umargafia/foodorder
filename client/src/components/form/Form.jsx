import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MyInput from '../global/MyInput';
import MyButton from '../global/MyButton';
import { LoginUser, SignUpUser } from '../../store/api';
import { loginUser } from '../../store/authSlice';

function Form() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [SignUpData, setSignUpData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (fieldName) => (text) => {
    setError('');
    const value = text.target.value;

    setLoginData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const handleSignUpChange = (fieldName) => (text) => {
    setError('');
    const value = text.target.value;
    setSignUpData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  async function handleLogin() {
    setLoading(true);
    const response = await LoginUser({ data: loginData });
    if (response.status !== 'success') {
      setError(response.message);
      setLoading(false);
      return;
    }
    dispatch(loginUser(response));
    localStorage.setItem('user', JSON.stringify(response));
    setLoading(false);
    navigate('/');
  }

  async function handleSighup() {
    setLoading(true);
    const response = await SignUpUser({ data: SignUpData });
    if (response?.status !== 'success') {
      setError(response?.message);
      setLoading(false);
      return;
    }
    dispatch(loginUser(response));
    localStorage.setItem('user', JSON.stringify(response));
    setLoading(false);
    navigate('/');
  }

  return (
    <>
      {isLogin ? (
        <>
          <Typography variant="h3" color="primary">
            LOGIN
          </Typography>
          <MyInput
            text="Email"
            type="email"
            props={{
              value: loginData.email,
              onChange: handleLoginChange('email'),
            }}
          />

          <MyInput
            text="Password"
            type="password"
            props={{
              value: loginData.password,
              onChange: handleLoginChange('password'),
            }}
          />
          {error && (
            <Typography sx={{ textAlign: 'center', color: 'red' }}>
              {error}
            </Typography>
          )}
          <MyButton
            text={loading ? 'loading...' : 'Login'}
            fullWidth
            onClick={handleLogin}
          />
          <Button
            sx={{ textTransform: 'capitalize' }}
            onClick={() => setLogin(false)}
          >
            Don't have an account? Create one
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h3" color="primary">
            Create Account
          </Typography>
          <MyInput
            props={{
              value: SignUpData.name,
              onChange: handleSignUpChange('name'),
            }}
            text="Full Name"
            type="text"
          />
          <MyInput
            props={{
              value: SignUpData.username,
              onChange: handleSignUpChange('username'),
            }}
            text="Username"
            type="text"
          />
          <MyInput
            props={{
              value: SignUpData.email,
              onChange: handleSignUpChange('email'),
            }}
            text="Email"
            type="email"
          />
          <MyInput
            props={{
              value: SignUpData.password,
              onChange: handleSignUpChange('password'),
            }}
            text="Password"
            type="password"
          />
          <MyInput
            props={{
              value: SignUpData.confirmPassword,
              onChange: handleSignUpChange('confirmPassword'),
            }}
            text="Confirm Password"
            type="password"
          />
          {error && (
            <Typography sx={{ textAlign: 'center', color: 'red', m: 2 }}>
              {error}
            </Typography>
          )}
          <MyButton
            text={loading ? 'loading...' : 'Create account'}
            fullWidth
            onClick={handleSighup}
          />

          <Button
            sx={{ textTransform: 'capitalize' }}
            onClick={() => setLogin(true)}
          >
            Already have an account? Login
          </Button>
        </>
      )}
    </>
  );
}

export default Form;
