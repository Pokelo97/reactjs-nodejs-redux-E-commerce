import React from 'react';
import {Switch, Route} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import ProductsComponent from '../components/ProductsComponent'
import ProductComponent from '../components/ProductComponent'
import addProductComponent from '../components/addProductComponent'
import CartComponent from '../components/CartComponent'
import Narbar from '../components/Navbar'

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

const Routes = () => {
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
        <Narbar 
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
            <Route exact path="/" component={ProductsComponent}/>
            <Route exact path="/Shop" component={ProductsComponent}/>
            <Route exact path="/product/:id" component={ProductComponent}/>
            <Route exact path="/addproduct" component={addProductComponent}/>
            <Route exact path="/cart" component={CartComponent}/>
          </Switch>
        </Typography>
          
        </main>
      </div> 
  );
}

export default Routes;
