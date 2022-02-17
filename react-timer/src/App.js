import { useState, useEffect, useCallback, useRef } from "react"

function Timer() {
const [currentTime, setCurrentTime] = useState(0)
const [tooltipShown, setTooltipShown] = useState(false)

useEffect(() => {
 const interval = setInterval(() => {
    setCurrentTime(currentTime => currentTime + 1)
  }, 1000)

  return () => {
    clearInterval(interval)
  }
}, [])

const tooltipPopperRef = useRef(null)

const onMouseOut = useCallback(() => {setTooltipShown(false)})
const onMouseOver = useCallback(() => {setTooltipShown(true)})

const ref = tooltipPopperRef.current
useEffect(() => {
  ref?.addEventListener("mouseover", onMouseOver)
  ref?.addEventListener("mouseout", onMouseOut)

  return () => {
    tooltipPopperRef.current?.removeEventListener("mouseover", onMouseOver)
    tooltipPopperRef.current?.removeEventListener("mouseout", onMouseOut)
  }
}, [onMouseOver, onMouseOut])

  return (
    <>
      <div>Timer {currentTime}</div>
      <div ref={tooltipPopperRef}>Tooltip Popper</div>
      {tooltipShown && <div>Timer {currentTime}</div>}
    </>
  );
}

function App() {
  const [index, setIndex] = useState(0)

  const createNewTimer = useCallback(() => {
    setIndex(index => index + 1)
  }, [index])

  return (
    <>
    <Timer key={index}/>
    <button onClick={createNewTimer}>New Timer</button>
    </>
  )
}

export default App;
