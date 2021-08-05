import React ,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getProductsDetails,editProduct as edit} from '../../redux/actions/productActions';
import AddProductComponent from '../../components/AddProductComponent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {addProduct as API} from '../../backendServer/api'
import MuiAlert from '@material-ui/lab/Alert';
  
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop:'20px',
      paddingBottom:'20px;'
    }
  }));

const EditProduct = ({history,match}) =>{
  const classes = useStyles();
  const[message,setErr]=useState();
  const [severity,setApiRep]=useState()
  const [reply,setReply]= useState();
 
  const dispatch = useDispatch();
  const ProductDetails = useSelector(state => state.getProductDetail);
  const editedProduct = useSelector(state => state.editProduct);
  const {product,loading,error}=ProductDetails;
  useEffect(()=>{
    let privilega=JSON.parse(localStorage.getItem('userData'));
      if(privilega.role!=="admin"){history.push('/signIn');console.log(3)}
    dispatch(getProductsDetails(match.params.id));
},[dispatch,match,history]);

const [values, setValues] = useState({
  name: {value:"", error:false,message:""},
  price: {value:"", error:false,message:""},
  inStock: {value:"", error:false,message:""},
  description: {value:"", error:false,message:""},
  ImageUrl:{value:"", error:false,message:""},
});
  const handleChange = (prop) => (e) => {
    e.preventDefault();
    let errorFlag=false;
    let errM=""
    if(e.target.value===""){
  		errorFlag=true;
      errM="Is Required"

  	}
    if(e.target.value.length >0){
      if((e.target.id==="name" || e.target.id==="description") && e.target.value.length < 3 ){
          errorFlag=true;
          errM="Minimum  of 3 characters is required!";
      }
      if ((e.target.id==="inStock" || e.target.id==="price" )&& isNaN(e.target.value)){
        errorFlag=true;
        errM= (e.target.id==='price'?('Price'):('In stock')) + ' must be a number!'
      }
    }
  	setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
  };
    
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!(values.price.value&& values.name.value&&values.description.value&&values.inStock.value&&values.ImageUrl.value)){
      console.log("err")

    }else{
      console.log(values)
      let info = {
        name:values.name.value,
        price:values.price.value,
        inStock:values.inStock.value,
        ImageUrl:values.ImageUrl.value,
        description:values.description.value
      }
      let token = localStorage.getItem('token')
      dispatch(edit(match.params.id,info,token))
      let error="";
      let message=''
      let status =""
      if(editedProduct.error){
        error = editedProduct.error
        setReply(true)
      }
      if(editedProduct.product){
        status =editedProduct.product.status
        message=editedProduct.product.data.message
          setReply(true)
      }
      setErr(status===200?(message):((error)?(error):(message)))
      setApiRep(status===200?'success':'error')
    }
  }
  
  return(
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            EDIT PRODUCT
          </Typography>
          <br/>
          {reply?( <Alert severity={severity}>{message}</Alert>):<></>}
        <AddProductComponent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
        />
      </Paper>
      
    </div>
    </Container>
  )
}
export default EditProduct;