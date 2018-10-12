import React from 'react';
import { Modal, ModalHeader, Button, ModalBody, ModalFooter,
         Form, Label, Input, FormGroup, Col, Alert } from '../../node_modules/reactstrap';
import URL from '../static/js/url';


class ModalCliente extends React.Component {
    clienteID;
    constructor(props){
        super(props);
        this.state = {
            openModal: false,
            identificacion: '',
            nombres: '',
            apellidos: '',
            email: ''
        }
        this.clienteID = this.props.cliente._id;
        

        this.toggle = this.toggle.bind(this);
        this.onChangeForm = this.onChangeForm.bind(this);
        this.updateCliente = this.updateCliente.bind(this);
    }

    componentWillMount() {
        console.log(this.clienteID);
        this.setState({
            openModal: false,
            identificacion: this.props.cliente.identificacion,
            nombres: this.props.cliente.nombres,
            apellidos: this.props.cliente.apellidos,
            email: this.props.cliente.email
        });
    }

    componentDidMount() {
        
    }

    toggle(){
        this.setState({
            openModal: !this.state.openModal,
            identificacion: this.props.cliente.identificacion,
            nombres: this.props.cliente.nombres,
            apellidos: this.props.cliente.apellidos,
            email: this.props.cliente.email
        });
    }

    onChangeForm(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    updateCliente(event) {
        fetch(URL.apiUrl+ 'clientes/update/'+ this.clienteID, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .catch((error) => {
            console.log(error);
        })
        .then((recurso) => {
            console.log(recurso); 
        });

        
        
    }

    render() {
      
        return (
            <div>
                <Button color='primary' onClick={this.toggle}>{this.props.label}</Button>
                <Modal isOpen={this.state.openModal} toggle={this.toggle}>
                   <ModalHeader toggle={this.toggle}>Cliente</ModalHeader>
                   <Form onSubmit= {this.updateCliente}>
                   <ModalBody>
                   
                  <FormGroup row>
                    <Label for="identificacion" sm={3}>Codigo:</Label>
                    <Col sm={6}>
                       <Input type="text" name="identificacion" id="identificacion" value={this.state.identificacion} 
                          onChange={this.onChangeForm} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="nombre" sm={3}>Nombre: </Label>
                    <Col sm={6}>
                        <Input type="text" name="nombres" id="nombres" value={this.state.nombres}
                          onChange={this.onChangeForm} required/>
                    </Col>
                   </FormGroup> 
                   <FormGroup row>
                    <Label for="apellidos" sm="3">Apellidos: </Label>
                    <Col sm={6}>
                        <Input type="text" name="apellidos" id="apellidos" value={this.state.apellidos}
                            onChange={this.onChangeForm} required/>
                    </Col>
                   </FormGroup>
                   <FormGroup row>
                       <Label for="email" sm="3">Email: </Label>
                       <Col sm={6}>
                          <Input type="email" name="email" id="email" value={this.state.email}
                             onChange={this.onChangeForm} required/>
                       </Col>
                   </FormGroup>
                  
                
                   </ModalBody>

                   <ModalFooter>
                      <Button color='success' onClick={this.toggle}>Cancelar</Button>
                      <Input color='success' sm={3} onClick={this.toggle} type="submit" value="Guardar"></Input>
                   </ModalFooter>
                   </Form>
                </Modal>
            </div>
        );
    }
}

export default ModalCliente;
