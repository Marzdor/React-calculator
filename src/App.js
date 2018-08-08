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
      showError: false,
      decimal: false
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick(e) {
    const btn = e.target.innerText;
    let text = this.state.displayText === "0" ? "" : this.state.displayText; // removes leading 0 in display

    if (text.length > 20 && (btn !== "CLR" && btn !== "DEL")) {
      text = "Digit Length Error";

      this.setState({
        output: this.state.displayText,
        displayText: text,
        showError: true
      });
      // handle error message
      setTimeout(() => {
        this.setState({
          displayText: this.state.output,
          showError: false
        });
      }, 1000);
    } else if (!this.state.showError) {
      switch (btn) {
        case "=":
          const input = reduceOperators(this.state.input);
          let hasDec = false;

          if (input) {
            let output;

            // if if input has "5.0" returns "5.0" if not a ".0" then returns .0000
            input.indexOf(".0") >= 0
              ? (output = eval(input).toFixed(1))
              : (output = eval(input)
                  .toString()
                  .slice(0, 6));

            // check if output has a decimal
            if (output.search(/[.]/g) !== -1) hasDec = true;

            this.setState({
              displayText: output,
              output: output,
              decimal: hasDec
            });
          }
          break;
        case "CLR":
          this.setState({
            displayText: "0",
            input: "0",
            output: "0",
            decimal: false
          });
          break;
        case "DEL":
          let newText = this.state.displayText.slice(0, -1);

          if (newText === "") newText = "0";

          this.setState({
            displayText: newText,
            input: newText
          });
          break;
        case ".":
          const lastInput = text.slice(-1);
          if (lastInput === "." || this.state.decimal) {
            this.setState({
              displayText: text,
              input: text
            });
          } else {
            this.setState({
              displayText: text + btn,
              input: text + btn,
              decimal: true
            });
          }
          break;
        case "/":
        case "*":
        case "-":
        case "+":
          this.setState({
            displayText: text + btn,
            input: text + btn,
            decimal: false
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

// make sure user input is valid and reduces operators
// operator ex. "+-+" => "+" "/-*/+/" => /
function reduceOperators(input) {
  const operators = input.match(/[/*+-]+/g);

  /// reduces multiple operators into the last one ex. "+*-/" => /
  if (operators !== null) {
    //reduce operators
    operators.map((op, index) => {
      op = op.replace(/\-/, "\\-");

      const regex = new RegExp("[" + op + "]{2,}");
      input = input.replace(regex, op.slice(-1));

      return true;
    });
  }
  return input;
}

export default App;
