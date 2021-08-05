import React, { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/actions/cartActions';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CartItemComponent from '../components/CartItemComponent';
import ProceedPaymentComponent from '../components/ProceedPaymentComponent';
import Snackbars from '../components/snackbarComponent'
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
    const [open, setOpen] = useState(false);
    const [action,setAction] = useState(false)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    
    const cart = useSelector(state => state.cart);
    const {cartItems}=cart;

    const addTotal=()=>{
       return cartItems.reduce((price,item)=>(item.price*item.qty)+price,0);
    }

    const cartCount =()=>{
       return cartItems.reduce((qty,item)=>Number(item.qty)+qty,0);
    }

    const qtyChangeHandler =(id,qty)=>{
        dispatch(addToCart(id,qty));
        setOpen(true)
        setAction(false)
    }
    const removeFromCartHandler = (id)=>{
        dispatch(removeFromCart(id));
        setOpen(true);
        setAction(true)
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h6" noWrap>
                    Shopping Cart
                </Typography>
            </Paper>
            <br/>
            {cartItems.length === 0 ?(
                <Typography component={'div'}>Your cart is empty</Typography>):(
                <>
                <Grid container spacing={3}>
                    <Grid item xs={12}sm={8}> 
                        {cartItems.map(item =>(
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
                </>
            )}
            <Snackbars 
                isArr={false}
                message={action?("A product was removed from the cart"):("The qty was update")}
                handleClose ={handleClose} 
                open={open}/>
        </div>
    );
}
export default Cart;
