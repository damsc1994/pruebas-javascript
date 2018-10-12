import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class ListLogs extends Component {
    products = [];
    constructor(props) {
        super(props)
        this.state = {
            logs: []
        };
    }

    componentDidMount() {
        this.setState({
            logs: this.props.logs
        });        
    }

    onSelectRow(row) {
        console.log(row);
    }

    render() {
        const options = {
            sizePerPage: 20,
             hideSizePerPage: true,
             noDataText: 'No se encontro iformacion para la fecha seleccionada'
        }

        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.onSelectRow
        }

        return (
            <div className="table-logs">
                <BootstrapTable data={this.props.logs} keyField={'dt_Start_Log'} pagination={true}
                    options={options} selectRow={selectRow}>
                   <TableHeaderColumn dataField='cd_cebroker_state'>Cebreker State</TableHeaderColumn>
                   <TableHeaderColumn dataField='cd_machine'>CD Machine</TableHeaderColumn>
                   <TableHeaderColumn dataField='dt_Start_Log'>Dt Start Log</TableHeaderColumn>
                </BootstrapTable>            
            </div>          
        );
    }
}


export default ListLogs;