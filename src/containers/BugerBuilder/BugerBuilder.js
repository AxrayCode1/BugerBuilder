import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {...}        
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null  
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error=>{
                this.setState({error: true});
            });        
    }

    updatePurchaseState(ingredients) {       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0)        
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCounted = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCounted;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () =>{
        // console.log('[purchaseHandler]');
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
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
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;        
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.state.ingredients){            
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}    
                    ordered={this.purchaseHandler}                
                />
            </Aux>        
            );
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}/>;
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (        
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);