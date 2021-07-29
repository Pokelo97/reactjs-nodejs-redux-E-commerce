import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'; 
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      margin: theme.spacing(1),
    },
  }));
const ProductComponent = (props)=>{
  const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}sm={4}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt=""
                  image={props.ImageUrl}
                  title=""
                />
              </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="h2">
                  {props.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{props.description}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                    {props.InStock>0?(<div>In Stock</div>):(<div>Out In Stock</div>)}
                    <FormControl className={classes.formControl}>
                      <InputLabel id="select-label">Count</InputLabel>
                      <Select
                        labelId="select-label"
                        id="select"
                        value={props.qty}
                        onChange={(e)=>props.onChangeHandler(e.target.value)}
                      >
                        {[...Array(props.InStock).keys()].map((x)=>(<MenuItem value={x+1}>{x+1}</MenuItem>))}
                      </Select>
                    </FormControl>
                    </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{props.price}</Typography>   
                </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={props.addToCartHandler}
                    className={classes.button}
                    startIcon={<AddShoppingCart />}
                  >
                    Add to cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
    );
}
export default ProductComponent;
