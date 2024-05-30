import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
import Signup from "./Component/Signup"
import TextEditor from './pages/TextEditor'
const App = () => {
  
  return (
     <>
    <Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/login" element={<Login></Login>}></Route>
  <Route path="/signup" element={<Signup></Signup>}></Route>
 </Routes>

   
    </>
  )
}

export default App