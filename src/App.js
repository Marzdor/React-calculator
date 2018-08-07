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
      output: "",
      showError: false
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick(e) {
    const btn = e.target.innerText;

    let text = this.state.displayText === "0" ? "" : this.state.displayText;
    console.log(btn);
    if (text.length > 20 && (btn !== "CLR" && btn !== "DEL")) {
      text = "Digit Length Error";

      this.setState({
        output: this.state.displayText,
        displayText: text,
        showError: true
      });

      setTimeout(() => {
        this.setState({
          displayText: this.state.output,
          showError: false
        });
      }, 1000);
    } else if (!this.state.showError) {
      switch (btn) {
        case "=":
          this.setState({
            displayText: eval(this.state.input)
              .toString()
              .slice(0, 21)
          });
          break;
        case "CLR":
          this.setState({
            displayText: "0",
            input: "0"
          });
          break;
        case "DEL":
          let newText = this.state.displayText.slice(0, -1);

          newText === "" ? (newText = "0") : null;

          this.setState({
            displayText: newText,
            input: newText
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
