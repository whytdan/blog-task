import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { fetchPosts, fetchPostsLoading } from '../../../redux/actions/posts';
import PostCard from './PostCard';
import Loader from '../../../components/Loader';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  pagination: {
    margin: '50px auto',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function PostsList() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const { data: posts, total, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsLoading());
    dispatch(fetchPosts(page));
  }, [page]);

  useEffect(() => {
    setCount(total);
  }, [total]);

  const onPageChange = (page) => {
    setPage(page);
  };

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

          <Pagination
            total={count}
            pageSize={20}
            current={page}
            onChange={onPageChange}
            className={classes.pagination}
          />
        </Container>
      )}
    </div>
  );
}
