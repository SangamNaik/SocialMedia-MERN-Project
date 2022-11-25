import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './NewPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../actions/Post';
import { useAlert } from 'react-alert';
import { loadUser } from '../../actions/User';

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, message, error } = useSelector((state) => state.post);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: 'clearErrors',
      });
    }
    if (message) {
      alert.success(message);
      dispatch({
        type: 'clearMessage',
      });
    }
  }, [dispatch, error, alert, message]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post"></img>}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Add Caption.."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
