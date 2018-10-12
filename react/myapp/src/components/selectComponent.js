import React from "react";

function OptionSelect(props) {
    return  <option>{props.value}</option>
}

export class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Selecciona uno" };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onSubmit(event) {
    console.log("Value ", this.state.value);
    event.preventDefault();
  }

  render() {
    const options =  this.props.nombres.map((v, i, arr) => <OptionSelect key={i} value={v}/>);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nombres: &nbsp;&nbsp;
          <select value={this.state.value} onChange={this.onChange}>
            {options}
          </select>
        </label>
        <p>
          <label>
            Selecionado: {this.state.value}
          </label>  
        </p>
      </form>
    );
  }
}
