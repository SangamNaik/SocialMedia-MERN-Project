import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import User from './../User/User';
import {
  getUserProfile,
  getUsersPosts,
  followAndUnfollowUser,
} from './../../actions/User';

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { user, loading: userLoading } = useSelector(
    (state) => state.userProfile
  );
  const { user: me, error: userError } = useSelector((state) => state.user);
  const { loading, posts, error } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.post);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUsersPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }

    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [me._id, user, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' });
    }
    if (followError) {
      alert.error(followError);
      dispatch({ type: 'clearErrors' });
    }
    if (userError) {
      alert.error(userError);
      dispatch({ type: 'clearErrors' });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [alert, error, message, dispatch, followError, userError]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">User has not made any posts</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: '12vmax', width: '12vmax' }}
            />
            <Typography variant="h5">{user.name}</Typography>

            <div>
              <button
                onClick={() => {
                  setFollowersToggle(!followersToggle);
                }}
              >
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button
                onClick={() => {
                  setFollowingToggle(!followingToggle);
                }}
              >
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>

              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? 'red' : '' }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => {
            setFollowersToggle(!followersToggle);
          }}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: '2vmax' }}>No Followers</Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => {
            setFollowingToggle(!followingToggle);
          }}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: '2vmax' }}>
                You don't Follow anyone.
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
