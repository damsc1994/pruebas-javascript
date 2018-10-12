import React, { Component } from 'react';
import './static/css/App.css';
import Log from './components/log';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Switch from '../node_modules/react-router-dom/Switch';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }


  render() {
    return (
      <div>
        <Router>
          <Switch>
           <Route exact path='/' component={Log}/>
           <Route path='/log/' component={Log}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
