import React, { useState } from "react";
import "./Calculator.css";

const buttons = [
  "1", "2", "3", "+",
  "4", "5", "6", "-",
  "7", "8", "9", "*",
  "0", "C", "/", "="
];

function Calculator() {
  const [currentInput, setCurrentInput] = useState("");
  const [lastInput, setLastInput] = useState("");

  const isOperator = (char) => ["+", "-", "*", "/"].includes(char);

  const handleClick = (value) => {
    // Clear
    if (value === "C") {
      setCurrentInput("");
      setLastInput("");
      return;
    }

    // Equals
    if (value === "=") {
      try {
        if (!isOperator(lastInput)) {
          const result = eval(currentInput).toString();
          setCurrentInput(result);
          setLastInput("");
        } else {
          setCurrentInput("Error");
          setLastInput("");
        }
      } catch {
        setCurrentInput("Error");
        setLastInput("");
      }
      return;
    }

    // Prevent multiple operators
    if (isOperator(value) && (currentInput === "" || isOperator(lastInput))) {
      return;
    }

    setCurrentInput((prev) => prev + value);
    setLastInput(value);
  };

  return (
    <div className="calculator">
      <div className="display">{currentInput}</div>

      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`btn 
              ${btn === "C" ? "clear" : ""} 
              ${btn === "=" ? "equals" : ""} 
              ${isOperator(btn) ? "operator" : ""}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
