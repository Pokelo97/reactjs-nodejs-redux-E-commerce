import React from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Grid from '@material-ui/core/Grid';
  import Paper from '@material-ui/core/Paper';
  import Typography from '@material-ui/core/Typography';
  import Button from '@material-ui/core/Button';
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
const ProceedPaymentComponent = (props)=>{
  const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        Total Amount: ({props.cartCount} {props.cartCount>1 ?("items"):("item")})
                    </Grid>
                    <Grid item xs={4}>
                        R {props.addTotal.toFixed(2)}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="center">
                            <Button variant="contained" color="primary" href="#contained-buttons">
                                Proceed to Checkout
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>  
        </div>
    );
}
export default ProceedPaymentComponent;
