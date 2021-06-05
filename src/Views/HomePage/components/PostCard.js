import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  description: {
    height: 120,
    marginTop: 20,
  },
  heading: {
    height: 64,
  },
});

export default function PostCard({ data }) {
  const classes = useStyles();

  const { title, body, id } = data;

  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.content}>
          <Typography
            className={classes.heading}
            gutterBottom
            variant="h5"
            component="h2"
          >
            <Truncate lines={2} ellipsis="...">
              {title}
            </Truncate>
          </Typography>

          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <Truncate lines={4} ellipsis="...">
              {body}
            </Truncate>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button
          onClick={() => history.push(`/products/${id}`)}
          size="small"
          color="primary"
        >
          Далее
        </Button>
      </CardActions>
    </Card>
  );
}
