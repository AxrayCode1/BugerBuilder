import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){        
        this.props.onFetchOrder();
    }

    render(){        
        return (
            <div>
                <Modal show={this.props.loading}>
                    <Spinner />
                </Modal>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </div>        
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {      
        onFetchOrder: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));