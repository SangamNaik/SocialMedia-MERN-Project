import React from 'react';
import './CommentCard.css';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommentOnPost } from './../../actions/Post';
import { getFollowingPosts, getMyPosts } from './../../actions/User';

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandler = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: '6vmax' }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
