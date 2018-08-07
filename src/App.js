import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons";
import Display from "./Display";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "0",
      input: "",
      output: ""
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick(e) {
    const btn = e.target.innerText;

    let text = this.state.displayText === "0" ? "" : this.state.displayText;

    if (text.length > 14) {
      text = "Digit Length Error";
      this.setState({
        output: this.state.displayText,
        displayText: text
      });
      setTimeout(() => {
        this.setState({
          displayText: this.state.output
        });
      }, 1000);
    } else {
      switch (btn) {
        case "=":
          this.setState({
            displayText: eval(this.state.input)
              .toString()
              .slice(0, 15)
          });
          break;
        case "CLR":
          this.setState({
            displayText: "0",
            input: "0"
          });
          break;
        default:
          this.setState({
            displayText: text + btn,
            input: text + btn
          });
      }
    }
  }
  render() {
    return (
      <div id="calculator">
        <Display displayText={this.state.displayText} />
        <Buttons handleBtnClick={this.handleBtnClick} />
      </div>
    );
  }
}

export default App;
