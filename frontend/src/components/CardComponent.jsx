import React from 'react';
import {addToCart} from '../redux/actions/cartActions';
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

 const CardComponent = (props)=>{
  const classes = useStyles();
  
  const dispatch = useDispatch();
  
  const addToCartHandler=()=>{
    dispatch(addToCart(props.productId,1));
    props.handleOpen()
    console.log(props.products)
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
    <Card className={classes.root}>
      <CardActionArea 
        component={Link} 
        to={`/product/`+props.productId}
        >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" component="p">
            {props.description.substring(0,100)}...
          </Typography>
          <Typography variant="body2" component="p">
            R {props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" 
          onClick={addToCartHandler} 
          startIcon={<AddShoppingCart />}>
          Add to cart
        </Button>
        <Button 
          size="small" 
          color="primary" 
          component={Link} 
          to={`/product/`+props.productId}>
          Learn More
        </Button>
      </CardActions>
    </Card>
    </Grid>
  );
}
export default CardComponent
