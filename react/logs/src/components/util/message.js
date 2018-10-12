import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Message extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.status);
        if (this.props.status === 'warning') {
            return (
                <div>
                    <Link to="/log">Regresar</Link>
                    <h1>No se encontro informacion</h1>
                </div>
            );
        } 
    
        return (
                <div>
                    <h1>Cargando...</h1>
                </div>
         );
    }
}


export default Message;