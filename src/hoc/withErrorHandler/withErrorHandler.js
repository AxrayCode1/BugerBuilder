import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrppedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        }

        constructor(props){
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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
