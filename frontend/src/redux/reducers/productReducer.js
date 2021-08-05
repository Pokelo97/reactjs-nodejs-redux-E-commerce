import * as actionType from '../constants/productConstants';

export const getProductReducer = (state = {products:[]},action)=>{
    switch(action.type){
        case actionType.GET_PRODUCTS_REQUEST:
            return{
                loading:true,
                products:[],
            };
        case actionType.GET_PRODUCTS_SECCESS:
            return{
                loading:false,
                products:action.payload,
            };
        case actionType.GET_PRODUCTS_FAIL:
           return{
            loading:false,
            error:action.payload,
           };
        default:
            return state;
    }
};

export const getProductDetailReducer = (state = {product:{}},action)=>{
    switch(action.type){
        case actionType.GET_PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
            };
        case actionType.GET_PRODUCT_DETAILS_SECCESS:
            return{
                loading:false,
                product:action.payload,
            };
        case actionType.GET_PRODUCT_DETAILS_FAIL:
           return{
            loading:false,
            error:action.payload,
           };
        case actionType.GET_PRODUCT_DETAILS_RESET:
           return {product:{}};
        default:
            return state;
    }
}
export const removeProductReducer  = (state = { product:{}},action)=>{
    switch (action.type) {
        case actionType.DELETE_PRODUCT_REQUEST:
            return{
                loading:true,

            };
        case actionType.DELETE_PRODUCT_SECCESS:
            return{
                loading:false,
                product:action.payload,

            }

        case actionType.DELETE_PRODUCT_FAIL:
           return{
            loading:false,
            error:action.payload,
           };
        default:
            return state;
    }
}
export const editProductReducer  = (state = { product:{}},action)=>{
    switch (action.type) {
        case actionType.EDIT_PRODUCT_REQUEST:
            return{
                loading:true,

            };
        case actionType.EDIT_PRODUCT_SECCESS:
            return{
                loading:false,
                product:action.payload,
                error:false,

            }

        case actionType.EDIT_PRODUCT_FAIL:
           return{
            loading:false,
            error:action.payload,
            product:false
           };
        default:
            return state;
    }
}