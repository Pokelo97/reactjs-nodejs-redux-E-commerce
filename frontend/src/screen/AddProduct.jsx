import React ,{useState} from 'react'
import AddProductComponent from '../components/AddProductComponent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1028,
    },
  }));
const AddProduct = () =>{
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    price: '',
    inStock: '',
    description: '',
    ImageUrl:'',
  });
  const[errorMessage,setErr]=useState([]);
  const [responseApi,setApiRep]=useState()

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(event.target.value);      
  };
    
  const handleSubmit = (event) => {
    event.preventDefault(); 
    setErr([]);
    axios.post("/addProduct",values)
    .then(res => {
      res.data.message.errors 
        ?(res.data.message.errors.map((error)=>
          setErr(oldArray => [...oldArray,error.msg])))
        :(setApiRep(res.data.message));
            //setApiRep({ responseApi:res.data.message });
    }).catch(err => {
    console.log(err);
    });
  }
  return(
    <div className={classes.root}> 
      <Paper className={classes.paper}>
        <AddProductComponent
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
        />
      </Paper>
      { (errorMessage || []).map(error => (<div>{error}</div>))}
      <div>
        {responseApi}
      </div>
    </div>
  )
}
export default AddProduct;