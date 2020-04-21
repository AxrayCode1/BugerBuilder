import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary/Auxilliary';

const sideDrawer = (props) => {
    let attatchedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attatchedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attatchedClasses.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems  isAuthenticated={props.isAuth}/>
                </nav>
            </div>            
        </Aux>
    );
};

export default sideDrawer;