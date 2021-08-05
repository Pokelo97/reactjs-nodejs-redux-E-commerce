import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(1),
  },
}));

export default function RegisterComponent(props) {
  const classes = useStyles(); 
  

  return (
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
        <Grid item xs={12} sm={6}>
            <FormControl error = {props.values.surname.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="Surname">Surname</InputLabel>
                <OutlinedInput
                    id="surname"
                    label="Surname"
                    value={props.values.surname.value}
                    onChange={props.handleChange('surname')}               
                />
                {props.values.surname.message?
                (<FormHelperText id="surname">{props.values.surname.message}</FormHelperText>):
                ("")}
            </FormControl>
        </Grid>
        <Grid item xs={12} >
            <FormControl error = {props.values.email.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                    id="email"
                    label="email"
                    value={props.values.email.value}
                    onChange={props.handleChange('email')}               
                />
                {props.values.email.message?
                (<FormHelperText id="email">{props.values.email.message}</FormHelperText>):
                ("")}
            </FormControl>
        </Grid> 
        <Grid item xs={12}>
            <FormControl error = {props.values.password.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="name">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    label="password"
                    fullWidth
                    type={props.show.password ? 'text' : 'password'}
                    value={props.values.password.value}
                    onChange={props.handleChange('password')} 
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={props.handleClickShowPassword}
                          onMouseDown={props.handleMouseDownPassword}
                          edge="end"
                        >
                          {props.show.password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    } 
                                
                />
                {props.values.password.message?
                (<FormHelperText id="password">{props.values.password.message}</FormHelperText>):
                ("")}
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl error = {props.values.confirmPassword.error || false } variant="outlined" required fullWidth>
                <InputLabel htmlFor="confirm-password">Confirm Paasword</InputLabel>
                <OutlinedInput
                    id="confirmPassword"
                    label="confirmPassword"
                    fullWidth
                    type={props.show.confirmPassword ? 'text' : 'password'}
                    value={props.values.confirmPassword.value}
                    onChange={props.handleChange('confirmPassword')} 
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={props.handleClickShowConfirmPassword}
                          onMouseDown={props.handleMouseDownPassword}
                          edge="end"
                        >
                          {props.show.confirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }              
                />
                {props.values.confirmPassword.message?
                (<FormHelperText id="confirmPassword">{props.values.confirmPassword.message}</FormHelperText>):
                ("")}
            </FormControl>
            </Grid>
        </Grid>
        <br/>
        <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.handleSubmit}>
            Register
        </Button>
    </form>
  );
}
