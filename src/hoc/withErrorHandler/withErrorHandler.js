import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrppedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);        
        
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        })
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);
        })

        useEffect(() => {
            return() => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, []);        

        const errorConfrimedHandler = () => {
            setError(null);
        }

     
        return (
            <Aux>
                <Modal 
                    show={error}
                    modalClosed={errorConfrimedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrppedComponent {...props} />
            </Aux>
        );
        
    }
}

export default withErrorHandler;
