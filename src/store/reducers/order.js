import * as actionTypes from '../actions/actionTypes';
import { updatedObject }  from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state) => {
    return updatedObject(state, { purchased: false}); 
}

const purchaseBurgerStart = (state) => {
    return updatedObject(state, { loading: true}); 
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData, {id: action.orderId});
    return updatedObject(state, { 
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });          
}

const purchaseBurgerFail = (state) => {
    return updatedObject(state, { loading: false});
}

const fetchOrdersStart = (state) => {
    return updatedObject(state, { loading: true});
}

const fetchOrdersSucess = (state, action) => {
    return updatedObject(state, { 
        orders: action.orders,
        loading: false
    });     
}

const fetchOrdersFail = (state) => {
    return updatedObject(state, { loading: false});        
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCAHSE_INIT: return purchaseInit(state);            
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);                       
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);              
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);                       
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);            
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSucess(state, action);                   
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);            
        default:
            return state;
    }
}

export default reducer;