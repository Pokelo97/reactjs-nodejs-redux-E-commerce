import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/actions/cartActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CartItemComponent from '../components/CartItemComponent';
import ProceedPaymentComponent from '../components/ProceedPaymentComponent';
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(1)}px auto`,
    },
  }));
const Cart = ()=>{
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
                    {cartItems.length === 0 ?(
                    <Typography component={'div'}>Your cart is empty</Typography>): 
                    cartItems.map(item =>(
                        <CartItemComponent
                            removeFromCartHandler={removeFromCartHandler}
                            qtyChangeHandler={qtyChangeHandler}
                            product={item.product}
                            countInStock={item.countInStock}
                            qty={item.qty}
                            ImageUrl={item.ImageUrl}
                            name={item.name}
                            price={item.price}
                        />    
                    ))}
                </Grid>
                
                <Grid item xs={12} sm={4}>
                    <ProceedPaymentComponent
                        cartCount={cartCount()}
                        addTotal={addTotal()}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default Cart;
