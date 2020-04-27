import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const burgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}        
    // }
    const [purchasing, setPurchasing] = useState(false);
    
    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0)        
        return sum > 0;
    }    

    const purchaseHandler = () =>{
        // console.log('[purchaseHandler]');
        if(props.isAuthenticated){
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }               
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        // alert('You continue!');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: props.ings,
        //     price: props.price,
        //     customer: {
        //         name: 'Max',
        //         address:{
        //             street: 'Teststreet 1',
        //             zipCode: '334',
        //             country: 'Taiwain'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }        
        // axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });        
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ings
    };
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;        
    
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if(props.ings){            
        burger = (
        <Aux>
            <Burger ingredients={props.ings}/>
            <BuildControls 
                purchasable={updatePurchaseState(props.ings)}
                price={props.price}
                addIngredient={props.onIngredientAdded} 
                removeIngredient={props.onIngredientRemoved}
                disabled={disabledInfo}                                            
                ordered={purchaseHandler}                
                isAuth={props.isAuthenticated}
            />
        </Aux>        
        );
        orderSummary = <OrderSummary
            price={props.price}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            ingredients={props.ings}/>;
    }       
    return (        
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
        
    )
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder,axios));