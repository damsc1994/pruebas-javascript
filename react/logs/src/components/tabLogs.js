import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import AverageResponseTime from './graphics/average-response-time';
import AverageTimeDays from './graphics/average-time-day';
import RequestPerCompleace from './graphics/request-per-compliace';
import RequestPerMachine from './graphics/request-per-machine';

class TabLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 1
        }

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(key) {
        this.setState({
            key
        });
    }

    render() {
        return (
            <div>
                  <Tabs id="tab-logs-graphics" activeKey={this.state.key} onSelect={this.onSelect}>
                        <Tab eventKey={1} title='Average Response Time'>
                            <AverageResponseTime logs={this.props.logs}/>
                        </Tab>
                        <Tab eventKey={2} title='Average Time per Day'>
                            <AverageTimeDays logs={this.props.logs}/>
                        </Tab>
                        <Tab eventKey={3} title='Average Response Time per Day'>
                            <RequestPerCompleace logs={this.props.logs}/>
                        </Tab>
                        <Tab eventKey={4} title='Total Requests per Machine'>
                            <RequestPerMachine logs={this.props.logs}/>
                        </Tab>
                    </Tabs>
            </div>
        )
    }
}

export default TabLogs;