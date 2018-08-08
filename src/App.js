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
          const input = checkInput(this.state.input);

          if (input[1]) {
            let output;
            input[0].indexOf(".0") >= 0
              ? (output = eval(input[0]).toFixed(1))
              : (output = eval(input[0])
                  .toString()
                  .slice(0, 21));
            this.setState({
              displayText: output,
              output: output
            });
          } else {
            // handle error message
            this.setState({
              displayText: input[0],
              showError: true
            });
            setTimeout(() => {
              this.setState({
                displayText: this.state.input,
                showError: false
              });
            }, 1000);
          }
          break;
        case "CLR":
          this.setState({
            displayText: "0",
            input: "0",
            output: "0"
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
function checkInput(input) {
  const operators = input.match(/[/*+-]+/g);
  const isValid = [input, true];

  // replace .. with .
  input = input.replace(/(?!^)[.]{2,}/g, ".");
  input = input.replace(/(?!^)[.]{2,}0/g, ".0");
  const nums = input.split(/[/*+-]/g);

  //Look through numbers look for more than 1 . ex. "2.3.4." => throws error
  if (nums !== null) {
    nums.map(num => {
      if (
        num.search(/[.]/g) !== -1 && // make sure number even has a .
        num.match(/[.]/g).length > 1 && // check if more then 1 .
        isValid[1] // input is also still valid
      ) {
        isValid[0] = "# has to many .";
        isValid[1] = false;
      }
      return true;
    });
  }

  /// reduces multiple operators into the last one ex. "+*-/" => /
  if (isValid[1] && operators !== null) {
    //reduce operators
    operators.map((op, index) => {
      op = op.replace(/\-/, "\\-");

      const regex = new RegExp("[" + op + "]{2,}");
      input = input.replace(regex, op.slice(-1));

      return true;
    });
  }

  if (isValid[1]) isValid[0] = input;

  return isValid;
}

export default App;
