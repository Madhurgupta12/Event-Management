import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
const App = () => {
  
  return (
     <>
    <Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/login" element={<Login></Login>}></Route>
 </Routes>

   
    </>
  )
}

export default App