import { useReducer } from "react";
import "./App.css";
import Button from "./Button";
import Operation from "./Operation";

//calculations:
const evalOperation = ({ currentInput, previousInput, operation }) => {
  const curr = parseFloat(currentInput);
  const prev = parseFloat(previousInput);
  if (isNaN(curr) || isNaN(prev)) {
    console.log(curr, "   ", prev);
    return "";
  }
  let result = null;
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      result = "";
      break;
  }
  return result.toString();
};

//updating state based on input type
//state is state which has all three variables we need
//action contains data with info which button is pressed
const calcOutput = (state, action) => {
  switch (action.type) {
    case "add-num":
      //to make sure we can add digits after avaluating
      if (state.clear)
        return {
          ...state,
          currentInput: action.data.digit,
          clear: false,
        };

      if (
        (action.data.digit === "0" || action.data.digit === "00") &&
        (state.currentInput === "0" || state.currentInput === "00")
      )
        return state;

      if (state.currentInput == null && action.data.digit === "00")
        return state;

      if (
        action.data.digit === "." &&
        (state.currentInput == null || state.currentInput.includes("."))
      )
        return state;

      return {
        ...state,
        currentInput: `${state.currentInput || ""}${action.data.digit}`,
      };

    case "all-clear":
      return {};

    case "clear-line":
      if (state.clear)
        return {
          ...state,
          clear: false,
          currentInput: null,
        };

      if (state.currentInput == null) return state;

      return {
        ...state,
        currentInput: null,
      };

    case "backspace":
      if (state.clear)
        return {
          ...state,
          clear: false,
          currentInput: null,
        };

      if (state.currentInput == null) return state;

      if (state.currentInput.length === 1)
        return {
          ...state,
          currentInput: null,
        };
      return {
        ...state,
        currentInput: state.currentInput.slice(0, -1),
      };

    case "eval":
      if (
        state.previousInput == null ||
        state.currentInput == null ||
        state.operation == null
      )
        return state;

      return {
        ...state,
        previousInput: null,
        operation: null,
        currentInput: evalOperation(state),
        clear: true,
      };

    case "operation":
      if (state.currentInput == null && state.previousInput == null)
        return state;

      if (state.currentInput == null) {
        return {
          ...state,
          operation: action.data.operator,
        };
      }

      if (state.previousInput == null)
        return {
          ...state,
          operation: action.data.operator,
          previousInput: state.currentInput,
          currentInput: null,
        };
      return {
        ...state,
        previousInput: evalOperation(state),
        currentInput: null,
        operation: action.data.operator,
      };

    default:
      return {};
  }
};

function App() {
  const [{ currentInput, previousInput, operation }, dispatch] = useReducer(
    calcOutput,
    {}
  );
  // 3 states need to be figured. dispatch is what allows us to change these states.
  // dispatch calls calOutput and updates values for our state variables initially empty

  return (
    <>
      <h1 className="title">React Calculator</h1>
      <div className="calculator">
        <div className="result">
          <div className="history">
            {previousInput} {operation}
          </div>
          <div className="number">{currentInput}</div>
        </div>
        {/* send type to dispatch to tell on what we need to do if button pressed */}
        <button
          className="clear-input"
          onClick={() => {
            dispatch({ type: "all-clear" });
          }}
        >
          AC
        </button>
        <button
          className="clear-input"
          onClick={() => {
            dispatch({ type: "clear-line" });
          }}
        >
          CE
        </button>
        <button          
          className="clear-input"
          onClick={() => {
            dispatch({ type: "backspace" });
          }}
        >
          ⌫
        </button>
        <Operation dispatch={dispatch} operator="/" />
        <Button dispatch={dispatch} digit="7" />
        <Button dispatch={dispatch} digit="8" />
        <Button dispatch={dispatch} digit="9" />
        <Operation dispatch={dispatch} operator="*" />
        <Button dispatch={dispatch} digit="4" />
        <Button dispatch={dispatch} digit="5" />
        <Button dispatch={dispatch} digit="6" />
        <Operation dispatch={dispatch} operator="-" />
        <Button dispatch={dispatch} digit="1" />
        <Button dispatch={dispatch} digit="2" />
        <Button dispatch={dispatch} digit="3" />
        <Operation dispatch={dispatch} operator="+" />
        <Button dispatch={dispatch} digit="00" />
        <Button dispatch={dispatch} digit="0" />
        <Button dispatch={dispatch} digit="." />
        <button
          onClick={() => {
            dispatch({ type: "eval" });
          }}
          className="evaluate"
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
