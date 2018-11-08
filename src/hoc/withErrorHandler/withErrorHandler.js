import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends React.Component {
        state = {
          error: null
        };
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeErrorModal = () => {
            this.setState({
                error: null
            });
        };
        render() {
            return (
                <Aux>
                    <Modal
                        visible={this.state.error}
                        hideModal={this.closeErrorModal}
                    >
                        <div style={{padding: '20px'}}>
                            <p>{this.state.error ? this.state.error.message: null }</p>
                            <div className='mt-3 d-flex flex-row-reverse'>
                                <button className="btn btn-danger" onClick={this.closeErrorModal}>Close</button>
                            </div>
                        </div>
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;
