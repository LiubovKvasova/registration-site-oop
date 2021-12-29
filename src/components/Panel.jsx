import React from "react";
import Field from "./Field";
import "./panel.css";

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const id = event.target.id;
    const { data, pageNumber } = this.props;
    const question = data[pageNumber].find((question) => question.id === id);

    const receivedAnswer = {
      [id]: {
        name: question.name,
        value: event.target.value
      }
    }; 
    
    this.setState(receivedAnswer);
    this.props.onChange(receivedAnswer);
  }

  render() {
    
    const fields = [];
    const { data, pageNumber } = this.props;

    for (const pageIndex in data) {
      const isVisible = pageIndex === pageNumber.toString();
      const page = data[pageIndex];

      for (const question of page) {
        fields.push(
          <Field id={question.id}
            name={question.name}
            onChange={this.handleChange}
            visible={isVisible} />
        );
      }
    }

    return (
      <div className="panel">
        <div className="questions">
          {fields}
        </div>
        <div className="controls">
          <div className="left-button">
            {
              (this.props.type !== "first") ?
              <button onClick={this.props.prevHandler}>Назад</button> :
              null
            }
          </div>
          <div className="central-button">
          {
            (this.props.type !== "last") ?
            <button onClick={this.props.nextHandler}>Далі</button> :
            <button onClick={this.props.finishHandler}>Завершити</button>
          }
          </div>
          <div className="right-button">
            <button onClick={this.props.cancelHandler}>Відміна</button>
          </div>
        </div>
      </div>
    );
  }
}
