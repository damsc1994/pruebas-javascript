import  React  from 'react';
import { Alert } from 'reactstrap';


class Alerta extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.estado);
        if (this.props.estado === "success") {
            
            return (
                <div>
                    <Alert color= "success">
                        {this.props.mensaje}
                    </Alert>
                </div>
            );
        } else if (this.props.estado === "error") {
            return (
                <div>
                    <Alert color= "danger">
                         {this.props.mensaje}
                    </Alert>
                </div>
            );
        }

        return null;
    }

}

export default Alerta;