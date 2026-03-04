
import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function AdvanceCounter() {
const [count, setCount] = useState(0);
const [step, setStep] = useState(1);
const [history, setHistory] = useState([0]);

const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Update count and previous count
const updateCount = (updater) => {
  setHistory((prevHistory) => {
    const prevCount = prevHistory[prevHistory.length - 1]; // get last count
    const nextCount = typeof updater === "function" ? updater(prevCount) : updater;
    return [...prevHistory, nextCount];
  });
  setCount((prev) => (typeof updater === "function" ? updater(prev) : updater));
};

// save count to local storage
useEffect(() => {
    const timer = setTimeout(() => {
        localStorage.setItem("myCount", count);
    }, 300);
    return () => clearTimeout(timer);
}, [count]);

  
     useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") updateCount((prev) => prev + step);
      if (e.key === "ArrowDown") updateCount((prev) => prev - step);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

    const handleReset = () => {
        setCount(0);
        setHistory([0]);
    };

    return (
        <div className="counter-container">
            <h2>Advance Counter</h2>
            <h3>Count: {count}</h3>

        <div className="button-group">
            <button onClick={() => updateCount((prev) => prev + step)}>Increment</button>
            <button onClick={() => updateCount((prev) => prev - step)}>Decrement</button>

            <button onClick={handleReset}>
                Reset
            </button>
            </div>
                
            <div className="step-section">
            <label htmlFor="stepValue">Step Value: </label>
            <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))}
            />
            </div>  


             <div className="history-section">
            <h4>Previous counts: {history.join(",")}</h4>  

            <p>Use ArrowUp to Increment and ArrowDown to decrement.</p>
        </div>
         </div>
    );

}


export default AdvanceCounter