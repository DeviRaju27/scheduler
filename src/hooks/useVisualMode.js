import { useState } from "react";

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  //function to switch modes and keep state of modes in array
  const transition = (nextMode, replace = false) => {
    
    if (replace) {
      setHistory(prev => {
        const newState = [...prev]
        newState.pop();
        return [...newState, nextMode]
      })
    } else {
      setHistory(prev => [...prev, nextMode])
    }
  }

  //function to go to previous mode using the state
  const back = () => {
    if (history.length > 1) {

      setHistory(prev => {
        const newState = [...prev]
        newState.pop()
        return newState
      })
    }
  }
  return { mode: history[history.length - 1], transition, back }
}
