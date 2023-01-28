import React from "react"
import useGlobalMessage from "../hooks/useGlobalMessage";

const App=():any=>{
   const toast=useGlobalMessage();
   return <h1>Hello</h1>
}

export default App;