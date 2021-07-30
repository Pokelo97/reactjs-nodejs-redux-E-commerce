import React from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Grid from '@material-ui/core/Grid';
  import Paper from '@material-ui/core/Paper';
  import Typography from '@material-ui/core/Typography';
  import IconButton from '@material-ui/core/IconButton';
  import DeleteIcon from '@material-ui/icons/Delete';
  import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(1)}px auto`,
    },
  }));
const CartItemComponent = (props)=>{
  const classes = useStyles();
  
    return (
        <Paper className={classes.paper}  key={props.product}>
            <Grid container spacing={1}>
                <Grid item xs={4} >
                    {props.ImageUrl}
                </Grid>
                <Grid item xs={2}>
                    {props.name}
                </Grid>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-label">Count</InputLabel>
                        <Select
                            labelId="select-label"
                            id="select"
                            value={props.qty}
                            onChange={(e)=>props.qtyChangeHandler(props.product,e.target.value)}
                        >
                            {[...Array(props.countInStock).keys()].map((x)=>(
                            <MenuItem key={props.product} value={x+1}>
                                {x+1}
                            </MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    {props.price}
                </Grid>
                <Grid item xs={2} >
                    <Typography align="right">
                        <IconButton aria-label="delete" onClick={()=>props.removeFromCartHandler(props.product)}>
                           <DeleteIcon />
                        </IconButton>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>                
    );
}
export default CartItemComponent;
