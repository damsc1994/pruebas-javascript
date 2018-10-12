import React, {Component} from 'react';
import * as c3 from 'c3';

class RequestPerMachine extends Component {
    chartFour;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getC3();
    }

    getUniqueMachine(logs){
        const cd_machine_arr = [];
    
        logs.forEach((log) => {
          cd_machine_arr.push(log.cd_machine);
        });
    
        const unique_arr = cd_machine_arr.filter((v, i, a) => a.indexOf(v) === i);
    
        return unique_arr;
    }

    getRequests(logs) {
        const responseTotal_aux = [];
        const cd_machine_arr = this.getUniqueMachine(this.props.logs);
    
    
        cd_machine_arr.forEach((cd_machine) => {
          let count = 0;
          const responseTotal = [];
          logs.filter((v, i, a) => {
              if (v.cd_machine === cd_machine) {
                count++;
                if (count === 1) {
                  responseTotal.push(v.cd_machine);
                }
              }
          });
    
          responseTotal.push(count);
    
          responseTotal_aux.push(responseTotal);
        });
    
        return responseTotal_aux;
    }

    getC3() {
        this.chartFour = c3.generate({  bindto: '#chartFour',
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
                <h3>Total Requests per Machine</h3>
                <div id="chartFour"></div>
            </div>
        );
    }
}


export default RequestPerMachine;