import * as actionTypes from '../constants/productConstants';
import authHeader from './middleware/authHeader';
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
        const {data}= await axios.get(`/getProduct/${id}`);
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
export const deleteProduct = (id) => async(dispatch)=>{
    try {
        dispatch({type: actionTypes.DELETE_PRODUCT_REQUEST});
        const data = await axios.delete(`/removeProduct/${id}`);

        dispatch({
            type: actionTypes.DELETE_PRODUCT_SECCESS,
            payload: data.data.message,
        })
        return Promise.resolve(data.data.message);
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message : error.message,
        });
        return Promise.reject(error.response && error.response.data.message
            ? error.response.data.message : error.message)
    }
}
export const editProduct =(id,values,token)=> async(dispatch)=>{
    try {
        dispatch({type: actionTypes.EDIT_PRODUCT_REQUEST});
        const data =await axios.put(`/editProduct/${id}`,values,
            {headers: authHeader(token)},
            
        )

        dispatch({
            type: actionTypes.EDIT_PRODUCT_SECCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: actionTypes.EDIT_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message : error.message,
        });
        return Promise.reject(error.response && error.response.data.message
            ? error.response.data.message : error.message)
    }
}