import React ,{useState} from 'react'
import LoginComponent from '../components/LoginComponent'
import {signIn,getUser} from '../backendServer/api'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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

const Login = ({history}) =>{
  const classes = useStyles();
  const [errMessage,setErrMessage]=useState({
    message:'',
    error:false
  })
  const [values, setValues] = useState({
    email:{value:"", error:false,message:""},
    password: {value:"", error:false,message:""},
  });

  const handleChange = (prop) => (e) => {
    e.preventDefault();
    let errorFlag=false;
    let errM=""
    if(e.target.value===""){
  		errorFlag=true;
      errM="Is Required"
  	}
  	setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
  };
  const [show,setShow] = useState(false);
  const handleClickShowPassword = () => {
    show? setShow(false): setShow(true)
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrMessage({error:false})
      if(values.password.error|| values.email.error){
        console.log("err")
      }else{
        signIn(values.password.value,values.email.value).then((res)=>{

          if(res.token){ 
            getUser(res.token)
              .then((data)=>{
                if(data.data.user){
                  localStorage.setItem('userData',JSON.stringify(data.data.user))
                }
              })
            localStorage.setItem('token',res.token)
            localStorage.setItem('isauthenticated',true)
            history.push('/addProduct')
          }else{
            setErrMessage({message:res.message,error:true})
          }
       }).catch((err)=>{setErrMessage({message:err,error:true})})
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
            SIGN IN
          </Typography>
          <br/>
          {errMessage.error?(<Alert severity="error">{errMessage.message}</Alert>):(null)}
          <LoginComponent 
              handleChange={handleChange}
              handleSubmit = {handleSubmit}
              
              handleMouseDownPassword ={handleMouseDownPassword}
              handleClickShowPassword ={handleClickShowPassword}
              showPassword= {show}
              values = {values}
          />
        </Paper>
      </div>
    </Container>
  )
}
export default Login;