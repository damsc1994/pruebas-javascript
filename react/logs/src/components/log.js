import React, { Component } from 'react';
import '../static/css/App.css';
import { ControlLabel, FormGroup, Grid, Col, Row, FormControl, Button, Glyphicon,
         Alert } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListLogs from './listLogs';
import WaitGif from '../components/util/waitGif';
import getLogs from '../services/logsService';
import Message from './util/message';
import modalLogs from './modalLogs';
import ModalLogs from './modalLogs';

class Log extends Component {
  wraning;
  constructor(props, context) {
    super(props, context);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      stateCode: 'FL',
      logs: null,
      status: '',
      alert: false
    }
    this.changedStartDate = this.changedStartDate.bind(this);
    this.changedEndDate = this.changedEndDate.bind(this);
    this.changed = this.changed.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.getLogs(this.state.startDate._d, this.state.endDate._d, this.state.stateCode);
  }
  
  changedStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  changedEndDate(date) {
    this.setState({
      endDate: date
    });
  }

  changed(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onClick(event) {
    this.getLogs(this.state.startDate._d, this.state.endDate._d, this.state.stateCode);
  }

  getOptionDate(date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  getLogs(startDate, endDate, stateCode) {
    this.setState({
      logs: [],
      status: ''
    });
    startDate = this.getOptionDate(startDate);
    endDate = this.getOptionDate(endDate);
    getLogs(startDate, endDate, stateCode).then(
      (response) => {
       
        if (response.length > 0) {
          console.log(response);
          this.setState({
            logs: response,
            status: 'success'
          })
        } else {
          this.setState({
            logs: response,
            status: 'warning'
          });
        }
        
      },
      (error) => {
        this.setState({
          status: 'error'
        });
      }
    );
  }

  showAlert() {
    this.setState({
      alert: this.state.status === 'warning' ? true : false
    });
  }

  render() {
      return (
        <div className="App">
          <h1 className="h1-strong">Logs</h1>
          <div>
            <Grid>
              <Row>
                <Col md={2}>
                  <FormGroup>
                  <ControlLabel>Fecha Inicio:</ControlLabel>
                  <DatePicker selected={this.state.startDate}
                          onChange={this.changedStartDate} 
                          key="startDate"
                          className="form-control"></DatePicker>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <ControlLabel>Fecha Final:</ControlLabel>
                  <FormGroup>
                    <DatePicker selected={this.state.endDate}
                      key="endDate"
                      onChange={this.changedEndDate} className="form-control"/>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <ControlLabel>State Code:</ControlLabel>
                  <FormGroup>
                    <FormControl componentClass="select" name="stateCode" value={this.state.stateCode}
                        onChange={this.changed}>
                      <option value="FL">FL</option>
                      <option value="OH">OH</option>
                      <option value="GA">GA</option>
                      <option value="LA">LA</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <br/>
                  <FormGroup>
                      <Button bsStyle="primary" onClick={this.onClick}>
                          <Glyphicon glyph="search"/>
                      </Button>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <br/>  
                  <FormGroup>
                    <ModalLogs status={this.state.status} logs={this.state.logs}/>
                  </FormGroup>
                </Col>
              </Row>
            </Grid>
          </div>
          <div className="table-logs">
               <ListLogs logs={this.state.logs}/>
          </div>
        </div>
      );
  }
}

export default Log;
