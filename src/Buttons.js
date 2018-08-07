import React from "react";

const Buttons = props => {
  const btnData = [
    ["clear", "CLR"],
    ["back", "DEL"],
    ["divide", "/"],
    ["seven", "7"],
    ["eight", "8"],
    ["nine", "9"],
    ["multiply", "*"],
    ["four", "4"],
    ["five", "5"],
    ["six", "6"],
    ["add", "+"],
    ["one", "1"],
    ["two", "2"],
    ["three", "3"],
    ["subtract", "-"],
    ["zero", "0"],
    ["decimal", "."],
    ["equals", "="]
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
