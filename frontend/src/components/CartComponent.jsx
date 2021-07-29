import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/actions/cartActions';
  import { makeStyles } from '@material-ui/core/styles';
  import Grid from '@material-ui/core/Grid';
  import Paper from '@material-ui/core/Paper';
  import Typography from '@material-ui/core/Typography';
  import Button from '@material-ui/core/Button';
  import IconButton from '@material-ui/core/IconButton';
  import DeleteIcon from '@material-ui/icons/Delete';
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
      margin: `${theme.spacing(1)}px auto`,
    },
  }));
const CartComponent = ()=>{
  const classes = useStyles();
  const dispatch = useDispatch();
    
  const cart = useSelector(state => state.cart);
  const {cartItems}=cart;

  const addTotal=()=>{
      return cartItems.reduce((price,item)=>(item.price*item.qty)+price,0);
  }

  const cartCount =()=>{
      return  cartItems.reduce((qty,item)=>Number(item.qty)+qty,0);
  }
  const qtyChangeHandler =(id,qty)=>{
      dispatch(addToCart(id,qty));
  }
  const removeFromCartHandler = (id)=>{
    dispatch(removeFromCart(id));
  }
    return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}sm={8}>
                {cartItems.length === 0
            ?(<Typography component={'div'}>Your cart is empty</Typography>) 
            : cartItems.map(item =>(
               
                    <Paper className={classes.paper}  key={item.product}>
                        <Grid container spacing={1}>
                            <Grid item xs={4} >
                                {item.ImageUrl}
                            </Grid>
                            <Grid item xs={2}>
                                {item.name}
                            </Grid>
                            <Grid item xs={2}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-label">Count</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        id="select"
                                        value={item.qty}
                                        onChange={(e)=>qtyChangeHandler(item.product,e.target.value)}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x)=>(
                                        <MenuItem value={x+1}>
                                            {x+1}
                                        </MenuItem>))}
                                    </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={2}>
                              {item.price}
                            </Grid>
                            <Grid item xs={2} >
                                <Typography align="right">
                                    <IconButton aria-label="delete" onClick={()=>removeFromCartHandler(item.product)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    ))}
                </Grid>
            
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3}>
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            Total Amount: ({cartCount()} {cartCount()>1 ?("items"):("item")})
                        </Grid>
                        <Grid item xs={4}>
                            R {addTotal().toFixed(2)}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="center">
                                <Button variant="contained" color="primary" href="#contained-buttons">
                                    Proceed to Checkout
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    </Paper>
                    
                </Grid>
          </Grid>
      </div>
    );
}
export default CartComponent;
