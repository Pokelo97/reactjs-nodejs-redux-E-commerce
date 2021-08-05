import React ,{useState} from 'react'

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
      maxWidth: 1028,
    },
  }));

const RemoveProduct = () =>{
  const classes = useStyles();

  
  const onClickHandler = () =>{}
  
  return(
    <div className={classes.root}> 
      <Paper className={classes.paper}>
            <Typography variant="h6" noWrap>
              Removed Products
            </Typography>
      </Paper>
      <br/>
      <Paper className={classes.paper}>
       </Paper>
    </div>
  )
}
export default RemoveProduct;