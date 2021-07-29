import React, { useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getProductsDetails} from '../redux/actions/productActions';
import {addToCart} from '../redux/actions/cartActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
  import CardMedia from '@material-ui/core/CardMedia';
  import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
  import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
const ProductComponent = ({match,history})=>{
  const classes = useStyles();
  const [qty,setQty]=useState(1);
  
  const dispatch = useDispatch();
  const ProductDetails = useSelector(state => state.getProductDetail);
  const {product,loading,error}=ProductDetails;
  
  useEffect(()=>{
      dispatch(getProductsDetails(match.params.id));
  },[dispatch,match]);

  const addToCartHandler=()=>{
    dispatch(addToCart(product.productId,qty));
    history.push("/cart");
  }
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {loading?(<h2>loading...</h2>):error?(<h2>{error}</h2>):(
          <Grid container spacing={3}>
            <Grid item xs={12}sm={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt=""
                  image={product.ImageUrl}
                  title=""
                />
              </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{product.description}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                    {product.InStock>0?(<div>In Stock</div>):(<div>Out In Stock</div>)}
                    <FormControl className={classes.formControl}>
                      <InputLabel id="select-label">Count</InputLabel>
                      <Select
                        labelId="select-label"
                        id="select"
                        value={qty}
                        onChange={(e)=>setQty(e.target.value)}
                      >
                        {[...Array(product.InStock).keys()].map((x)=>(<MenuItem value={x+1}>{x+1}</MenuItem>))}
                      </Select>
                    </FormControl>
                    </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{product.price}</Typography>   
                </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={addToCartHandler}
                    className={classes.button}
                    startIcon={<AddShoppingCart />}
                  >
                    Add to cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
          )}
      </Paper>
      </div>
    );
}
export default ProductComponent;
