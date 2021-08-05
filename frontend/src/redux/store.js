import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {cartReducer} from './reducers/cartReducers';
import {
    getProductReducer,
    getProductDetailReducer,
    removeProductReducer,
    editProductReducer} 
from './reducers/productReducer';

const reducer = combineReducers({
    cart:cartReducer,
    getProduct:getProductReducer,
    getProductDetail:getProductDetailReducer,
    removeProduct:removeProductReducer,
    editProduct:editProductReducer,
})
const middleware=[thunk];

const cartFromLocalStorage = localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[];
const initalState = {
    cart:{cartItems:cartFromLocalStorage}
}
const store = createStore(
    reducer,initalState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;