import React, { useState, useEffect } from 'react';
import './UpdateProfile.css';
import { Typography, Button, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loadUser, updateProfile } from '../../actions/User';
import Loader from '../Loader/Loader';

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.post);

  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setCurrentAvatar(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, alert, updateError, message]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: '2vmax' }}>
          Social Media App
        </Typography>

        <Avatar
          src={currentAvatar}
          alt="User"
          style={{ width: '10vmax', height: '10vmax' }}
        ></Avatar>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Name"
          className="updateProfileInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="updateProfileInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
