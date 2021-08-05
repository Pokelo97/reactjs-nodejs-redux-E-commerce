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

export default function LoginComponent(props) {
  const classes = useStyles(); 
  

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={2}>
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
                    type={props.showPassword ? 'text' : 'password'}
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
                          {props.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                                  
                />
                {props.values.password.message?
                (<FormHelperText id="password">{props.values.password.message}</FormHelperText>):
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
            Login
        </Button>
    </form>
  );
}
