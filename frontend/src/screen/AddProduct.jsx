import React ,{useState,useEffect} from 'react'
import AddProductComponent from '../components/AddProductComponent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {addProduct as API} from '../backendServer/api'
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

const AddProduct = ({history}) =>{
  const classes = useStyles();
  const[errorMessage,setErr]=useState([]);
  const[errShow,setErrShow]=useState(false);
  const [responseApi,setApiRep]=useState({
    message:'',
    show:false
  })
  const [values, setValues] = useState({
    name: {value:"", error:false,message:""},
    price: {value:"", error:false,message:""},
    inStock: {value:"", error:false,message:""},
    description: {value:"", error:false,message:""},
    ImageUrl:{value:"", error:false,message:""},
  });

  useEffect(()=> {
    let privilega=JSON.parse(localStorage.getItem('userData'));
      if(privilega.role!=="admin"){history.push('/signIn');console.log(3)}
  })


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
    setErr([]);
    console.log(values)
    if(!(values.price.value&& values.name.value&&values.description.value&&values.inStock.value&&values.ImageUrl.value)){
      console.log("err")

    }else{
      
      let info = {
        name:values.name.value,
        price:values.price.value,
        inStock:values.inStock.value,
        ImageUrl:values.ImageUrl.value,
        description:values.description.value
      }
      let token = localStorage.getItem('token')
      API(info,token).then( res =>{
        res.message.errors 
          ?(res.message.errors.map((error)=>
            setErr(oldArray => [...oldArray,error.msg])))
            (setErrShow(true))
          :(setApiRep({message:res.message,show:true}));

      }).catch(err => {
        console.log(err);
        setErr(oldArray => [...oldArray,err])
      })
    }
  }
  
  return(
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            ADD PRODUCT
          </Typography>
          <br/>
          {errShow?( <Alert severity="error">{errorMessage}</Alert>):<></>}
          {responseApi.show ?( <Alert severity="success">{responseApi.message}</Alert>):(null)}
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
export default AddProduct;