import React, {Component} from 'react';
import * as c3 from 'c3';

class AverageResponseTime extends Component {
    chartTwo;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getC3();
    }

    getResponseTime(logs) {
        let responseTime = 0;
        logs.forEach((log) => {
          responseTime +=  (new Date(log.dt_end_log).getTime() - new Date(log.dt_Start_Log).getTime());
        });

        responseTime = responseTime / logs.length;
    
        return responseTime;
    }
    
    getC3() {
        this.chartTwo = c3.generate({  bindto: '#chartTwo',
            data: {
                columns: [
                    ['Total Average Response Time ', this.getResponseTime(this.props.logs)],
                ]
            },
            bar: {
                width: {
                    ratio: 0.2
                }
            }
        });
    }


    render() {
        return (
            <div>
                <h3>Average Response Time</h3>
                <div id="chartTwo">
                    
                </div>
            </div>
        );
    }
}


export default AverageResponseTime;