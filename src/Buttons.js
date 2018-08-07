import React from "react";

const Buttons = props => {
  const btnData = [
    ["equals", "="],
    ["zero", "0"],
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
    ["add", "+"],
    ["subtract", "-"],
    ["multiply", "*"],
    ["divide", "/"],
    ["decimal", "."],
    ["clear", "CLR"]
  ];
  const buttons = [];

  btnData.map(btn => {
    return buttons.push(
      <button
        id={btn[0]}
        className="button"
        key={btn[0]}
        onClick={props.handleBtnClick}
      >
        {btn[1]}
      </button>
    );
  });

  return <section id="buttonContainer">{buttons}</section>;
};

export default Buttons;
