import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(1)
  },
}));

export default function FormFields(props) {
  const classes = useStyles(); 

  return (
      <>
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl error = {props.values.name.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                    id="name"
                    label="name"
                    value={props.values.name.value}
                    onChange={props.handleChange('name')}
                    autoFocus                
                />
                {props.values.name.message?
                (<FormHelperText id="name1">{props.values.name.message}</FormHelperText>):
                ("")}
            </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} >
        <FormControl error = {props.values.price.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="name">Price</InputLabel>
                <OutlinedInput
                    id="price"
                    label="price"
                    value={props.values.price.value}
                    onChange={props.handleChange('price')}
                />
                {props.values.price.message?
                (<FormHelperText id="name1">{props.values.price.message}</FormHelperText>):
                ("")}
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl error = {props.values.inStock.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="inStock">In Stock</InputLabel>
                <OutlinedInput
                    id="inStock"
                    label="inStock"
                    value={props.values.inStock.value}
                    onChange={props.handleChange('inStock')}
                />
                {props.values.inStock.message?
                (<FormHelperText id="inStock">{props.values.inStock.message}</FormHelperText>):
                ("")}
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl error = {props.values.ImageUrl.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="ImageUrl">Image Url</InputLabel>
                <OutlinedInput
                    id="ImageUrl"
                    label="ImageUrl"
                    value={props.values.ImageUrl.value}
                    onChange={props.handleChange('ImageUrl')}
                />
                {props.values.ImageUrl.message?
                (<FormHelperText id="ImageUrl">{props.values.ImageUrl.message}</FormHelperText>):
                ("")}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl error = {props.values.description.error || false } variant="outlined" required fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput
                    id="description"
                    label="description"
                    value={props.values.description.value}
                    multiline
                    maxRows={4}
                    onChange={props.handleChange('description')}
                />
                {props.values.description.message?
                (<FormHelperText id="description">{props.values.description.message}</FormHelperText>):
                ("")}
            </FormControl>
            
          </Grid>
          <Grid item sm={3}>
            <Button 
              type="submit"
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={props.handleSubmit}>
                Submit
            </Button>
          </Grid>
        </Grid>
    </form>
    </>
  );
}
