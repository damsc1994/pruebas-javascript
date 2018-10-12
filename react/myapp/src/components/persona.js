import React from 'react';
import NoSSR from 'react-no-ssr';
import { ListPersonas } from './listPersonas';

const personas_arr = [];
export function Inicio(props) {
    personas_arr.push(props.nombre);
    return (
        <div>
            <h4>Bienvenido, {props.nombre}</h4>
            <ListPersonas personas={props.nombres}/>
        </div>
    );
}

export function Loading() {
    console.log('cargando...');
    return (<div>Loading...</div>)
} 

export class Time extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.time(),
            1000
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

   
    
    render() {
        return (
            <div>
                <NoSSR onSSR={<Loading/>}>
                    <h1>Hora: {this.state.date.toLocaleTimeString()}</h1>
                </NoSSR>
            </div>
        );
    }

    time() {
        this.setState({
            date: new Date()
        });
    }
    
}  


