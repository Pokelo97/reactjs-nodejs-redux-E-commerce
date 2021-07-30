import * as actionTypes from '../constants/productConstants';
import axios from 'axios';

export const getProducts=()=> async(dispatch)=>{
    try {
        dispatch({type: actionTypes.GET_PRODUCTS_REQUEST});

        const {data}= await axios.get("/products");

        dispatch({
            type: actionTypes.GET_PRODUCTS_SECCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type:actionTypes.GET_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message : error.message,
        });
    }
};
export const getProductsDetails=(id)=> async(dispatch)=>{
    try {
        dispatch({type:actionTypes.GET_PRODUCT_DETAILS_REQUEST});
        const {data}= await axios.get(`http://localhost:5000/getProduct/${id}`);
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_SECCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message : error.message,
        });
    }
};

export const removeProduct=()=>(dispatch)=>{
    dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_RESET,
    });
};