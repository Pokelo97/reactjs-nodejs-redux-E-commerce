import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {getProducts as listProduct} from '../redux/actions/productActions';
import CardComponent from '../components/CardComponent';
import CircularUnderLoad from '../components/CircularUnderLoadComponent'
import Snackbars from '../components/snackbarComponent'
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
  },
}));

const Shop = ()=>{
    const classes = useStyles();

    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProduct);
    const {products,loading,error}=getProducts;
    
    const [open, setOpen] = React.useState(false);
    const handleOpen =()=>{
      setOpen(true)
      console.log(products)
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    useEffect(()=>{
      dispatch(listProduct());
      
    },[dispatch]);

    
    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Shopping
            </Typography>
        </Paper>
        <br/>
        <Paper className={classes.paper}>
          <Grid  container spacing={3}>
          {loading?(<CircularUnderLoad/>):error?(<h2>{error}</h2>):(products.map((products)=>
            <CardComponent 
                key={products.productId}
                title={products.name}
                img={products.ImageUrl}
                description={products.description}
                price={products.price}
                productId={products.productId}
                handleOpen={handleOpen}
              />
          ))}
        </Grid>
      </Paper>
      <Snackbars 
          isArr={false}
          message="Added to Cart!"
          handleClose ={handleClose} 
          open={open}/>
    </div>
  )
}
export default Shop;