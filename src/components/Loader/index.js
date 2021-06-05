import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    top: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 0,
    left: 0,
  },
});

export default function Loader() {
  const classes = useStyles();

  return <CircularProgress className={classes.loader} size={96} />;
}
