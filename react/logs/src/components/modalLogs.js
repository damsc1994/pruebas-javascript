import React, {Component} from 'react';
import {Button, Modal, Tabs, Tab} from 'react-bootstrap';
import TabLogs from './tabLogs';


class ModalLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        console.log(this.state.openModal);
        this.setState({
            openModal: false
        });
    }

    toggleModal() {
        this.setState({
            openModal: !this.state.openModal
        });
    }

    render() {
        if (this.props.status === 'success') {
            return (
                <div>
                    <Button bsStyle='primary' onClick={this.toggleModal}>Graphics</Button>
                    <Modal show={this.state.openModal} onHide={this.toggleModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Graphics</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <TabLogs logs={this.props.logs}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle='primary' onClick={this.toggleModal}>Cerrar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else {
            return null;
        }

    }
}

export default ModalLogs;