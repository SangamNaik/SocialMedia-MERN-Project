import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './../../actions/User';
import { useAlert } from 'react-alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const alert = useAlert();
  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.post);

  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: 'clearErrors' });
    }
  }, [error, dispatch, alert, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Social Media App
        </Typography>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
