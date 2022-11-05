import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {
    if (replace) {
      setHistory(prev => prev.slice(0, -1))
      setHistory(prev => [...prev, nextMode])

    } else {
      setHistory(prev => [...prev, nextMode])
    }
    setMode(() => (nextMode))
  }

  const back = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1))
      setMode(history[history.length - 2])
      console.log("his", history)
    }

  }
  return { mode, transition, back }
}
