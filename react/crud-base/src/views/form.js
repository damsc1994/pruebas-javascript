import React from 'react';
import '../static/forms.css';
import { Form, Label, Input, FormGroup, Col, Alert } from 'reactstrap';
import URL from '../static/js/url';
import Alertas from './Alertas';




class Forms extends React.Component {
    clientes = [];
    constructor(props){
        super(props);
        //this.clientes = clienteService.getClientes();
        this.state = ({
           identificacion: '',
           nombres: '',
           apellidos: '',
           email: '',
           estado: ''
        });

        this.addCliente = this.addCliente.bind(this);
        this.onChangeForm = this.onChangeForm.bind(this);
    }

    componentDidMount() {
		
	}
    onChangeForm(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    addCliente(event) {
        fetch(URL.apiUrl+ 'clientes/add', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((recurso) => {
            console.log(recurso);   
            this.setState({
                estado: 'success'
            })
        }).catch((err) => {
            this.setState({
                estado: 'error'
            });
        })
        
    }


    render() {
        return (
            <div className="div-form">
                <h4>Registrar Clientes {this.state.cantidad}</h4>
                <Form onSubmit= {this.addCliente}>
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
                   <FormGroup row>
                        <Col sm={4}>
                          <Input className="btn-guardar-form" color="success" type="submit" value="Enviar"/>                        
                        </Col>
                   </FormGroup>
                  
                </Form>
            </div>
        );
    }
}

export default Forms;