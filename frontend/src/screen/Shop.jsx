import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {getProducts as listProduct} from '../redux/actions/productActions';
import CardComponent from '../components/CardComponent';
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Shop = ()=>{
    const classes = useStyles();

    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProduct);
    const {products,loading,error}=getProducts;

    useEffect(()=>{
      dispatch(listProduct());
    },[dispatch]);

    
    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          {loading?(<h2>loading...</h2>):error?(<h2>{error}</h2>):(products.map((products)=>
            <CardComponent 
                key={products.productId}
                title={products.name}
                img={products.ImageUrl}
                description={products.description}
                price={products.price}
                productId={products.productId}
              />
          ))}
        </Grid>
    </div>
    )
}
export default Shop;