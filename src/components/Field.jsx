import React from "react";
import "./field.css";

export default class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onChange(event);
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className="registration-field" style={(this.props.visible) ? {} : { display: "none" }}>
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <input id={this.props.id} 
               type="text" 
               value={this.state.value} 
               onChange={this.handleClick}>
        </input>
      </div>
    );
  }
}
