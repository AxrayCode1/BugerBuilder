import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrppedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        errorConfrimedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfrimedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrppedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;