import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function LeftDrawer(props) {
  const classes = useStyles();
  
  const privilega=JSON.parse(localStorage.getItem('userData'));
  const isauthenticated= localStorage.getItem('isauthenticated');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.handleDrawerClose}>
            <Close />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='shop' component={Link} to='/Shop'>
              <ListItemIcon><ShoppingCart/></ListItemIcon>
              <ListItemText primary='Shop' />
            </ListItem>

            
            {isauthenticated&&privilega.role==='admin'?
                (<><ListItem button key="AddProduct" component={Link} to='/addProduct'>
                    <ListItemText primary='Add Product' />
                </ListItem>
                <ListItem button key="Products" component={Link} to='/admin'>
                    <ListItemText primary='Products' />
                </ListItem></>):(<></>)}
        
        </List>
        <List>
        <Grid container spacing={2}>
          {!isauthenticated?(<>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              component={Link} to='/signIn'
              className={classes.button}
              endIcon={<Person/>}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button color="primary" component={Link} to='/signUp' className={classes.button}>
              Register
            </Button>
          </Grid>
        </>):(
          <Grid item xs={12}>
          <Button color="primary" component={Link} to='/signOut' className={classes.button}>
            SIGN OUT
          </Button>
        </Grid>
        )}
        </Grid>
        </List>
      </Drawer>
    </div>
  );
}
