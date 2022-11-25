import React, { useEffect, useState } from 'react';
import './UpdatePassword.css';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from './../Loader/Loader';
import { updatePassword } from '../../actions/User';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.post);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword));
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
  }, [dispatch, error, alert, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Social Media App
        </Typography>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          className="updatePasswordInputs"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Button disabled={loading} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
