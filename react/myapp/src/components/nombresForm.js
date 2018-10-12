import React from 'react';
import { Inicio, Time } from './persona';
import { SelectComponent } from './selectComponent'


export class NombresForm extends React.Component {
    constructor(props){
        super(props);

        this.state = ({
            nombre: ''
        });
        this.nombres = [];
        this.onChangeForm = this.onChangeForm.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeForm(event){
        this.setState({
            nombre: event.target.value.toUpperCase()
        });
        
    }

    onSubmitForm(event) {
        this.nombres.push(this.state.nombre);
        event.preventDefault();
        this.setState({
            nombre: ''
        });
    }

    render(){    
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <p>
                        <label>Digite nombre</label>
                    </p>
                    <p>
                        <input type="text" value={this.state.nombre} onChange={this.onChangeForm}/>
                    </p>   
                    <input type="submit" value="Enviar" />
                </form>
                <Inicio nombres={this.nombres} nombre={this.state.nombre} />
                <SelectComponent nombres={this.nombres}/> 
            </div> 
        )
    }
}