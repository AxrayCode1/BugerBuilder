import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/Auxilliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as buregerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {...}        
    // }
    state = {              
        purchasing: false,
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error=>{
        //         this.setState({error: true});
        //     });        
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0)        
        return sum > 0;
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
        //     ingredients: this.props.ings,
        //     price: this.props.price,
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
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;        
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings){            
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price}
                    addIngredient={this.props.onIngredientAdded} 
                    removeIngredient={this.props.onIngredientRemoved}
                    disabled={disabledInfo}    
                    ordered={this.purchaseHandler}                
                />
            </Aux>        
            );
            orderSummary = <OrderSummary
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}/>;
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

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(buregerBuilderActions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(buregerBuilderActions.removeIngredient(name)),
        onInitIngredients: () => dispatch(buregerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));