import React, { Component } from 'react';
import './static/App.css';
import Forms from './views/form';
import { Row, Col, Container } from 'reactstrap';
import  ListClientes from './views/listClientes';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-title">Clientes</h1>
        </header>
        <div>
              <Row>
                  <Col  xs="3" className="form-cliente">  
                      <Forms/>
                  </Col>
                  <Col sm={{ size: 'auto', offset: 1 }}>
                       <ListClientes/>
                  </Col>
              </Row>
        </div>
        
      </div>
    );
  }
}

export default App;
