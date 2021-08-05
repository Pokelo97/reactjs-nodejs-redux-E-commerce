import React ,{useState} from 'react'
import RegisterComponent from '../components/RegisterComponent'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {signUp } from '../backendServer/api';
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
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#1f2d40',
    },
  }));

const Register = ({history}) =>{
  const classes = useStyles();
  const [values, setValues] = useState({
    name:{value:"", error:false,message:""},
    surname:{value:"", error:false,message:""},
    email:{value:"", error:false,message:""},
    password: {value:"", error:false,message:""},
    confirmPassword:{value:"", error:false,message:""},
    role:"user",
  });
  const [errMessage,setErrMessage]=useState({
    message:'',
    error:false
  })
  const [show,setShow] = useState({
    confirmPassword:false,
    password:false,
  });
  const handleClickShowConfirmPassword = (prop) => {
      show.confirmPassword? setShow({confirmPassword:false}): setShow({confirmPassword:true})
  };
  const handleClickShowPassword = (prop) => {
      show.password? setShow({password:false}): setShow({password:true})
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (e) => {
    e.preventDefault();
    let errorFlag=false;
    let errM=""
    if(e.target.value===""){
  		errorFlag=true;
      errM="Is Required"
  	}
    if(e.target.value.length >0){
      if((e.target.id==="name" || e.target.id==="surname") && e.target.value.length < 3 ){
          errorFlag=true;
          errM="Minimum  of 3 characters is required!";
      }
      if(e.target.id==="email" && (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)))){
        errorFlag=true;
        errM="Email is not valid."
      }
      if (e.target.id==="password" && e.target.value.length < 6){
        errorFlag=true;
        errM="Password should have minimum 6 characters!"
      }
      if (e.target.id==="confirmPassword" && e.target.value !== values.password.value){
        errorFlag=true;
        errM="The passwords do not match!"
      }
    }
  	setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
      if(values.name.error||
          values.surname.error||
          values.password.error||
          values.email.error||
          values.confirmPassword.error){
        console.log("err")
      }else{
        let value ={
          name:values.name.value,
          surname:values.surname.value,
          email:values.email.value,
          password:values.password.value,
          role:values.role,
        }
        signUp(value).then((res)=>{
          res.message==="The user has been successfully inserted"?
            (history.push("/signIn"))
          :
            (console.log(res))
            (setErrMessage({message:res.error,error:true}))
       }).catch((err)=>{console.log(err)})
      }
  }
  return(
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <br/>
          {errMessage.error?(<Alert severity="error">{errMessage.message}</Alert>):(null)}
          <RegisterComponent 
              handleChange={handleChange}
              handleSubmit = {handleSubmit}
              handleMouseDownPassword ={handleMouseDownPassword}
              handleClickShowPassword ={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              show= {show}
              values = {values}
          />
        </Paper>
      </div>
    </Container>
  )
}
export default Register;