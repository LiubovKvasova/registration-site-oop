import './App.css';
import Panel from './components/Panel';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      answers: {},
      showResults: false
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.closeTab = this.closeTab.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }
  
  nextPage() {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
  }
  
  previousPage() {
    this.setState({
      pageNumber: this.state.pageNumber - 1
    });
  }

  setAnswers(answerSet) {
    this.setState({
      answers: Object.assign(this.state.answers, answerSet)
    });
  }

  closeTab () {
    window.open("about:blank", "_self");
    window.close();
  }

  async componentDidMount() {
    const response = await fetch("data.json");
    const result = await response.json();
    this.setState(result);
  }

  handleFinish () {
    const values = Object.values(this.state.answers);
    const filteredAnswers = values.filter((answer) => answer.value.length > 0);

    var dataStr = "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(filteredAnswers));

    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "results.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    this.setState({
      showResults: true,
      answers: filteredAnswers
    });
  }
  
  render() {
    var panelType = "regular";

    if (this.state.pageNumber === 0) {
      panelType = "first";
    } else if (this.state.pageNumber === this.state.questions.length - 1) {
      panelType = "last";
    }

    const internals = (this.state.showResults) ?
      this.state.answers.map(({ name, value }) => <p>{`${name}: ${value}`}</p>) :
      <Panel data={this.state.questions} pageNumber={this.state.pageNumber} onChange={this.setAnswers} type={panelType}
             prevHandler={this.previousPage} nextHandler={this.nextPage} finishHandler={this.handleFinish}
             cancelHandler={this.closeTab} />

    return (
      <div className="App">
        <header className="App-header">
          {internals}
        </header>
      </div>
    );
  }
}
