import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import { Typography, Button } from '@mui/material';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/User';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, error, message } = useSelector((state) => state.post);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
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
  }, [error, message, alert, dispatch]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Social Media App
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          className="resetPasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Link to="/">
          <Typography>Login</Typography>
        </Link>

        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
