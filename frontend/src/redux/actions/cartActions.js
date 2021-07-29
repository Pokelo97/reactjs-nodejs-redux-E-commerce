import * as actionType from '../constants/cartConstants';
import axios from 'axios';

export const addToCart=(id,qty)=> async(dispatch,getState)=>{
    const {data}= await axios.get(`/getProduct/${id}`);
    dispatch({
        type: actionType.ADD_TO_CART,
        payload:{
            product:data.productId,
            name:data.name,
            imageURL:data.ImageUrl,
            price:data.price,
            countInStock:data.InStock,
            qty
        }
    })
    localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems));
}
export const removeFromCart =(id)=> (dispatch,getState)=>{
    dispatch({
        type : actionType.REMOVE_FRROM_CART,
        payload:id
    })
    localStorage.setItem('cart',JSON.stringify(getState().cart.cartItems));
}