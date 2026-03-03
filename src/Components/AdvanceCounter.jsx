import { use } from "react";
import {useState, useEffect} from "react";


function AdvanceCounter() {
const [count, setCount] = useState(0);
const [step, setStep] = useState(1);
const [history, setHistory] = useState([]);

function addIncrement() {
    const aValue = count + step;
    setCount(aValue);
    setHistory([...history, aValue])
}
useEffect(() => {
    localStorage.setItem("myCount", count);
    console.log("It's working");
   return ()=> { } 
}, [count]) 


    return (
        <div>
            <h2>Advance Counter</h2>
            <h3>Count: {count}</h3>

            <button onClick={() => setCount(count +1) }>Increment</button>
            <button onClick={() => setCount(count -1)}>Decrement</button>

            <label htmlFor="stepValue"></label>
            <input type="number" value={step}onChange={(e) => {setStep(Number(e.target.value))}} />
            
            <h4>Changes saved {step}</h4>  
            <h4>Count History: {history.join(",")}</h4>
            {/* <button onClick={reset }>Reset</button>; */}

        </div>
    )

}


export default AdvanceCounter