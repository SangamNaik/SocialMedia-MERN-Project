import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/User';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector((state) => state.post);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [alert, dispatch, error, message]);

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Social Media App
        </Typography>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="forgotPasswordInputs"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
