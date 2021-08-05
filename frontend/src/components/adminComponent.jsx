import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';


const NarbarComponent = (props)=>{
  
    return (<>
        <ListItem button key="AddProduct" component={Link} to='/addProduct'>
            <ListItemText primary='Add Product' />
        </ListItem>
        <ListItem button key="Products" component={Link} to='/productAdmin'>
            <ListItemText primary='Products' />
        </ListItem>
        </>
    );
}
export default adminComponent;
