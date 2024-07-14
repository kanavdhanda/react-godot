import {useState } from "react"
import Godot from "./godot"
function App() {
  // const [state, setState] = useState(false)
  // const buttonClick = () => {
  //     setState(true)
  // }

  return (
    <>
    <div className="relative">
    <h1 className="absolte top-0 left-0">React game thing testing</h1>
    {/* <button onClick={buttonClick}>Click me to play the game</button> */}
    <Godot className="h-[500px] w-[500px]"/>

{/* {state && (
)} */}
    </div>
      
    </>
  )
}

export default App
