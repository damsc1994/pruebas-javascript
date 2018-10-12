import React from 'react';
import ReactDOM from 'react-dom';
import { NombresForm } from './components/nombresForm';
import { Inicio, Time } from './components/persona';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';



class Load extends React.Component {
    
    constructor(props){
        super(props)
        this.state = ({
            sexo: 'M',
            nombre: 'Damaso Salgado C'
        });
    }

    isMasculino() {
        this.setState({
            sexo: 'M',
            nombre: 'Damaso Salgado C'
        });
    }

    isFemenino() {
        this.setState({
            sexo: 'F',
            nombre: 'Maria jose'
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/hora">Hora</Link>
                            </li>
                        </ul>
                        
                        <Route exact path="/" component={NombresForm}/>
                        <Route path="/hora" component={Time}/>
                    </div>
                </Router>
       
            </div>
        )
    }

}



ReactDOM.render(
    <Load/>,
    document.getElementById('root')
);