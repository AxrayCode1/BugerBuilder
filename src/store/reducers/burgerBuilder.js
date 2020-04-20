import * as actionTypes from '../actions/actionTypes';
import { updatedObject }  from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updatedObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState);
}

const removeIngredients = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updatedObject(state.ingredients,updatedIng);
    const updatedSta= {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedSta);   
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat                    
        },
        totalPrice: 4,
        error: false
    });         
}

const fetchIngredientsFailed = (state) => {
    return updatedObject(state, {
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredients(state, action);                     
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);               
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);                        
        default:
            return state;        
    }    
}

export default reducer;