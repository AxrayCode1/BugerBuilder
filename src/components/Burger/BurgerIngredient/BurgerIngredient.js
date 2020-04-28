import React from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

const burgerIngredient = props => {    
    let ingredienet = null;        
    switch(props.type){
        case ('bread-bottom'):
            ingredienet  = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredienet = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat') :
            ingredienet  = <div className={classes.Meat}></div>;
            break;
        case ('cheese'):
            ingredienet  = <div className={classes.Cheese}></div>;
            break;
        case ('salad'):
            ingredienet  = <div className={classes.Salad}></div>;
            break;
        case ('bacon'):
            ingredienet  = <div className={classes.Bacon}></div>;
            break;
        default:
            break;
    }

    return ingredienet;    
}

burgerIngredient.propTypes = {
    type : PropTypes.string.isRequired
}

export default burgerIngredient;