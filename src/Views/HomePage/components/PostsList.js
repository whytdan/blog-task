import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../redux/actions/posts';
import PostCard from './PostCard';
import Loader from '../../../components/Loader';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PostsList() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { data: posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  console.log(posts);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
                <PostCard data={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}
