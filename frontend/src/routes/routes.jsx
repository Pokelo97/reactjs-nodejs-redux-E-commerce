import React from 'react';
import {Switch, Route} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Shop from '../screen/Shop'
import Product from '../screen/Product'
import Cart from '../screen/Cart'
import NarbarComponent from '../components/NavbarComponent';
import AddProduct from '../screen/AddProduct';
import Register from '../screen/Register'
import Login from '../screen/Login'
import ProductsAdmin from '../screen/Admin/ProductsAdmin';
import EditProduct from '../screen/Admin/EditProduct';
import SignOut from '../screen/SignOut'
import PrivateRoute from './privateRoute'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Routes = ({history}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    
  return (
      <div className={classes.root}>
        <NarbarComponent
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
        />
        
        <main className={clsx(classes.content, {
          [classes.contentShift]:open,
        })}>
          <div className={classes.drawerHeader} />
          <Typography paragraph>
          <Switch>
            <Route exact path="/" component={Shop}/>
            <Route exact path="/Shop" component={Shop}/>
            <Route exact path="/product/:id" component={Product}/>
            <Route exact path="/signUp" component={Register}/>
            <Route exact path="/signIn" component={Login}/>
            <PrivateRoute path="/admin" component={ProductsAdmin}/>
            <Route exact path='/cart' component={Cart} />
            <PrivateRoute path='/editProduct/:id' component={EditProduct} />
            <PrivateRoute path='/signOut' component={SignOut} />
            <PrivateRoute path='/addProduct' component={AddProduct} />
          </Switch>
        </Typography>
        </main>
      </div> 
  );
}

export default Routes;
