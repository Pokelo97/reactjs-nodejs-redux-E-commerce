import React, { useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getProductsDetails} from '../redux/actions/productActions';
import ProductComponent from '../components/ProductComponent';
import {addToCart} from '../redux/actions/cartActions';
import CircularUnderLoad from '../components/CircularUnderLoadComponent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
  }));
const Product = ({match,history})=>{
  const classes = useStyles();
  const [qty,setQty]=useState(1);
  
  const dispatch = useDispatch();
  const ProductDetails = useSelector(state => state.getProductDetail);
  const {product,loading,error}=ProductDetails;

  const onChangeHandler=(qty)=>{
      setQty(qty)
  }
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
            <Typography variant="h6" noWrap>
              Product
            </Typography>
      </Paper>
      <br/>
        <Paper className={classes.paper}>
          {loading?(<CircularUnderLoad/>):error?(<h2>{error}</h2>):(
              <ProductComponent
                ImageUrl={product.ImageUrl}
                name={product.name}
                price={product.price}
                description={product.description}
                InStock={product.InStock}
                qty={qty}
                addToCartHandler={addToCartHandler}
                onChangeHandler={onChangeHandler}
              />
          )}
      </Paper>
      </div>
    );
}
export default Product;
