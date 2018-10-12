import React from  'react';
import { Table, Button, Badge, Input, FormGroup, Col, Alert } from '../../node_modules/reactstrap';
import URL from '../static/js/url';
import ModalCliente from './modal';
import Alerta from './Alertas';

class DatosTabla extends React.Component {
    constructor(props) {
        super(props)
        this.eliminarCliente.bind(this);
        this.posicion = props.numero;
    }

    eliminarCliente(id) {
        if(id) {
            fetch(URL.apiUrl + '/cliente/delete/'+ id,
                {method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }}).then((response) => response.json())
                .then((res) => {
                   this.props.accion('success');
                }).catch((error) => {
                    this.props.accion('errror');  
                });
        }   
    }

    componentDidMount(){
    
    }

    componentWillMount() {
      
    }

    render () {
        const modalCLiente = <ModalCliente label="Ver" cliente={this.props.value}></ModalCliente>;
        return (
            <tr>
                <td>{this.props.value.identificacion}</td>
                <td>{this.props.value.nombres}</td>
                <td>{this.props.value.apellidos}</td>
                <td>{this.props.value.email}</td>
                <td><Button color="danger" onClick={this.eliminarCliente.bind(this, [this.props.value._id])}>Eliminar</Button></td>
                <td>{modalCLiente}</td>
           </tr>
        )
    }

}




class ListClientes extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: 1,
            totalClientes: 0,
            clientes: [],
            actualizarTabla: false,
            pages: 0,
            valorBusqueda: '',
            estado: ''
        };
        
        this.getClientes = this.getClientes.bind(this);
        this.getPage = this.getPage.bind(this);
        this.onChangeBusqueda = this.onChangeBusqueda.bind(this);
        this.onBuscar = this.onBuscar.bind(this);
    }

    getClientes(page = 1, value = null) {
        var url = URL.apiUrl + 'clientes/getClientes/'+ page;
        if (value) {
            url = URL.apiUrl + 'clientes/getClientes/'+ page + '/' + value;
        }
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                this.setState({
                    page: recurso.page,
                    clientes : recurso.clientes,
                    totalClientes: recurso.total,
                    pages: recurso.pages
                });
        });
    }
    
    getPage(siguiente) {
        var page = this.state.page;
        if (siguiente) {
            page++;
        } else {
            page--;
        }
        this.getClientes(page);
    }

    componentDidMount() {
       this.getClientes();
    }
    componentWillUnmount() {
        clearInterval();
    }

    actualizarTabla(estado) {
        this.getClientes();
        this.setState({
            estado: estado
        })
        
    }

    onChangeBusqueda(event) {
        this.setState({
            valorBusqueda: event.target.value
        });
    }

    onBuscar(event){
        this.getClientes(1, this.state.valorBusqueda);
    }

    render() {
        console.log(this.state.estado);
        const clienteComponent = this.state.clientes.map((v, i) => 
            <DatosTabla key={i} value={v}
            clientes={this.state.clientes} accion={this.actualizarTabla.bind(this)}/>
        );
        const alerta = <Alerta estado = {this.state.estado && this.state.estado === 'success' ? this.state.estado : ''}
            mensaje= {this.state.estado && this.state.estado === 'success' ? 'Eliminado correctamente' : ''}/>
        if (this.state.estado === 'error') {
            <Alerta estado = {this.state.estado && this.state.estado === 'error' ? this.state.estado : ''}
            mensaje= {this.state.estado && this.state.estado === 'error' ? 'Error al intentar eliminar' : ''}/>
        }
        return (
            <div>
                <h5>Clientes ({this.state.totalClientes})</h5>
                {alerta}
                <FormGroup row>
                    <Col sm={6}>
                        <Input type="text" id="valorBusqueda" value={this.state.valorBusqueda} onChange={this.onChangeBusqueda}/>
                        <Button color="info" type="submit" onClick={this.onBuscar}>Buscar</Button>
                    </Col>
                </FormGroup>
                <Table striped hover>
                    <thead>
                        <tr>   
                        <th>N° ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clienteComponent}
                    </tbody>
                </Table>
                 <Button color="primary" onClick={this.getPage.bind(this, false)} disabled={this.state.page <= 1}>Anterior</Button>
                 {' '}
                 <Badge color="danger">{this.state.page}</Badge>
                 {' '}
                 <Button color="primary" onClick={this.getPage.bind(this, true)} disabled={this.state.pages == this.state.page}
                    >Siguiente</Button>
            </div>         
        );
    }
} 

export default ListClientes;