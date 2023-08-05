import "./App.css";
import React, { useState, useEffect } from "react";
import { dataArray } from "./Components/data";
import Button from "./Components/Button";
import Screen from "./Components/Screen";
import Wrapper from "./Components/Wrapper";
import ButtonBox from "./Components/ButtonBox";
import History from "./Components/History";
import HistoryFields from "./Components/HistoryFields";
function App() {
  const [calc, setCalc] = useState({
    num: 0,
    res: 0,
    sign: "",
  });
  const [historyArray, setHistoryArray] = useState([]);
  const [historyCache, setHistoryCache] = useState("");
  function insertSpaces(num) {
    return num
      .toString()
      .replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  }

  useEffect(() => {
    function handleKeyDown(event) {
      event.preventDefault();
      evaluate(event.key);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleClickHistory(value) {
    setCalc({
      ...calc,
      res: value.val,
    }
    )
  }


  function evaluate(handlerCase) {
    switch (handlerCase) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        signClickHandler(handlerCase);
        break;
      case "CE":
        deleteClickHandler();
        break;
      case "←":
      case "Backspace":
        deleteOneClickHandler();
        break;
      case ".":
      case ",":
        commaClickHandler(handlerCase);
        break;
      case "=":
      case "Enter":
        equalClickHandler();
        break;
      default:
        numberClickHandler(handlerCase);
    }
  }
  function deleteLastDigit(number) {
    let stringNum = number.toString();
    let solution = stringNum.slice(0, -1);
    return solution;
  }

  const signClickHandler = (value) => {
    if (calc.sign) {
      equalClickHandler(value);
    } else {
      setCalc({
        ...calc,
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
      });
    }
  };
  const deleteClickHandler = () => {
    setCalc({
      num: 0,
      res: 0,
      sign: "",
    });
  };
  const deleteOneClickHandler = () => {
    console.log(calc.num);
    setCalc({
      ...calc,
      num: calc.num ? deleteLastDigit(calc.num) : calc.num,
      res: !calc.num ? deleteLastDigit(calc.res) : calc.res,
    });
  };
  const numberClickHandler = (value) => {
    if (!/^\d+$/.test(value)) {
      console.log("input is not a number");
    } else {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === 0
            ? calc.num.toString()
            : calc.num.toString().includes(".")
            ? calc.num + value
            : calc.num % 1 === 0
            ? Number(calc.num.toString() + value.toString())
            : Number(calc.num.toString() + value.toString()),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };
  const commaClickHandler = (value) => {
    setCalc({
      ...calc,
      num: calc.num.toString().includes(".") ? calc.num : calc.num + ".",
    });
  };

  const equalClickHandler = (value) => {
    if (!calc.sign) {
      // If there is no sign, do nothing
      return;
    }
    function percrent(res, num) {
      return Math.round((res * 100) / num);
    }

    function calculateValue(num, res, sign) {
      if (sign === "+") {
        return res + num;
      } else if (sign === "-") {
        return res - num;
      } else if (sign === "/") {
        return res / num;
      } else if (sign === "*") {
        return res * num;
      } else if (sign === "%") {
        return percrent(res, num);
      }
    }
    setCalc({
      ...calc,
      res:
        calc.num === 0
          ? 0
          : calc.num === 0 && calc.sign === "/"
          ? "Cant divide 0"
          : calculateValue(Number(calc.num), Number(calc.res), calc.sign),
          num: !calc.res === 0 ? calc.num : 0,
          sign: value ? value : "",
    });
          if(!value){
      setHistoryArray([...historyArray,
        {id: `${historyCache} ${calc.res} ${calc.sign} ${calc.num}`, val: calculateValue(Number(calc.num), Number(calc.res), calc.sign)}])
        setHistoryCache("")
      }
       else{
         setHistoryCache(`${historyCache} ${calc.res} ${calc.sign} ${calc.num} =`)
      } 
  };


  return (
    <div className="App">
      <Wrapper>
        <Screen
          sign={calc.sign}
          value={insertSpaces(calc.num ? calc.num : calc.res)}
        />
        <ButtonBox>
          {dataArray.map((val, i) => {
            return (
              <Button
                key={i}
                value={val}
                className={val === "=" ? "equal" : ""}
                clickHandler={() => {
                  evaluate(val);
                }}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
      <History>
        {historyArray.map((value) => {
          return <HistoryFields calculation={value.id} solution={value.val} click={() => {handleClickHistory(value)}}/>;
        })}
      </History>
    </div>
  );
}

export default App;
