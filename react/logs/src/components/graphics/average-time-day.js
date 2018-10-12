import React, {Component} from 'react';
import * as c3 from 'c3';



class AverageTimeDays extends Component {
    chart;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getC3();
    }

    getUniqueDate(logs) {
        const cd_machine_arr = [];
    
        logs.forEach((log) => {
          cd_machine_arr.push(this.getOptionDate(new Date(log.dt_Start_Log)));
        });
    
        const unique_arr = [];
        cd_machine_arr.filter((v, i, a) => {
          if ( a.indexOf(v) === i) {
            unique_arr.push(v);
          }
        });
        return unique_arr;
    }
    
    getXs(uniqueArr) {
        const lengthArr = uniqueArr.length;
        const resultArr = [];
    
        for (let i = 0 ; i < lengthArr ; i++) {
          let unique = uniqueArr[i];
          const uniqueAux = unique.toString().split('/');
          unique = uniqueAux[1];
          if ( i === 0) {
            resultArr.push('x1');
          }
          resultArr.push(unique);
        }
        return resultArr;
    }

    getResponse(logs, responseTimePerDay_arr){
        let totalResponseTimePerDay = 0;
        let count = 0;
    
        const responseTotal = [];
        responseTimePerDay_arr.forEach((responseTimePerDay) => {
    
            logs.filter((v, i, a) => {
                if (responseTimePerDay === this.getOptionDate(new Date(v.dt_Start_Log))) {
                    totalResponseTimePerDay +=  (new Date(v.dt_end_log).getTime() - new Date(v.dt_Start_Log).getTime());
                    if (count === 1) {
                    responseTotal.push('Dias');
                    }
                    count++;
                }
            });
    
          responseTotal.push(totalResponseTimePerDay);
    
        });
        return responseTotal;
    }

    getOptionDate(date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    }

    getC3() {
        
        var uniqueDay = this.getUniqueDate(this.props.logs);
        
        var unique_arr_xs = this.getXs(uniqueDay);
        
        const response = this.getResponse(this.props.logs, uniqueDay);
    
        this.chart =  c3.generate({ bindto: '#chart',
        data: {
          xs: {
            'Dias': 'x1',
          },
          columns: [
            unique_arr_xs,
            response,
    
          ]
          },
          bar: {
              width: {
                  ratio: 0.5
              }
    
    
          }
        });

        
    
    }

    render() {
        return (
            <div>
                <h3>Average Response Time per Day</h3>
                <div id="chart">
                </div>
            </div>
        );
    }

}



export default AverageTimeDays;