import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';

import {getProducts as listProduct,deleteProduct} from '../../redux/actions/productActions';

//material-ui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProductTable from '../../components/ProductsTable';
import CircularUnderLoad from '../../components/CircularUnderLoadComponent';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
  
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
  },
}));

const ProductsAdmin = ({history})=>{
    const classes = useStyles();
    const [resMessage,setResMessage] = useState();
    const dispatch = useDispatch();
    const getProducts = useSelector(state => state.getProduct);
    const {products,loading,error}=getProducts;
    const [open, setOpen] = React.useState(false);
    const [ids,setId]= React.useState();
    const [openAlert,setOpenAlert]=useState(false)

    useEffect(()=>{
      let privilega=JSON.parse(localStorage.getItem('userData'));
        if(privilega.role!=="admin"){history.push('/signIn');console.log(3)}
      dispatch(listProduct());
    },[dispatch,history]);

    const handleClickOpen = (event,id) => {
      setOpen(true);
      setId(id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };

    const RemoveP =(productId)=>{
      dispatch(deleteProduct(productId))
      .then(response => {
        setResMessage(response);
      })
      .catch(e => {
        setResMessage(e);
      })
      
      dispatch(listProduct());
      setOpen(false)
      setOpenAlert(true);
    }
    
    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Products
            </Typography>
        </Paper>
        <br/>

        <Paper className={classes.paper}>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
            {resMessage}
        </Alert>
      </Snackbar>
        {loading?(<CircularUnderLoad/>):error?(<h2>{error}</h2>):( 
        <ProductTable 
          products={products} 
          removeP={RemoveP} 
          setResMessage={setResMessage}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open} ids={ids}
        />)}
           
        </Paper>
    </div>
  )
}
export default ProductsAdmin;