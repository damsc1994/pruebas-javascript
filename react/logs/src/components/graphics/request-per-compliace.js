import React, {Component} from 'react';
import * as c3 from 'c3';

class RequestPerCompleace extends Component {
    chartThree;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getC3();
    }

    getUniqueStatus(logs) {
        const cd_machine_arr = [];
    
        logs.forEach((log) => {
          cd_machine_arr.push(log.ds_compl_status_returned);
        });
    
        const unique_arr = cd_machine_arr.filter((v, i, a) => a.indexOf(v) === i);
        return unique_arr;
    }

    getRequests(logs) {
        const responseTotal_aux = [];
        const status = this.getUniqueStatus(this.props.logs);
    
    
        status.forEach((compl_status_returned) => {
            let count = 0;
            const responseTotal = [];
            logs.filter((v, i, a) => {
                if (v.ds_compl_status_returned === compl_status_returned) {
                    count++;
                    if (count === 1) {
        
                    responseTotal.push(v.ds_compl_status_returned !== '' ? v.ds_compl_status_returned : 'Stateless');
                    }
                }
            });
        
            responseTotal.push(count);
        
            responseTotal_aux.push(responseTotal);
        });
    
        return responseTotal_aux;
    }

    getResponseTime() {
        let responseTimePerDay = 0;
        let responseTotal = 0;
    
        this.logs.sort().forEach((log) => {
          responseTimePerDay +=  (new Date(log.dt_end_log).getTime() - new Date(log.dt_Start_Log).getTime());
        });
    
        responseTotal = responseTimePerDay / this.logs.length;
        return responseTotal;
    }

    getC3() {
        this.chartThree = c3.generate({  bindto: '#chartThree',
          data: {
            columns: this.getRequests(this.props.logs),
            type: 'bar'
          }
        });
    
    
    }
    
    
    getOptionDate(date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    }

    render() {
        return (
            <div>
                <h3>Average Response Time per Day</h3>
                <div id="chartThree"></div>
            </div>
        );
    }
}

export default RequestPerCompleace;