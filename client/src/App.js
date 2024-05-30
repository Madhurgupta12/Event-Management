import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
import Signup from "./Component/Signup"
import TextEditor from './pages/TextEditor'
import Kanban from "./Component/KanBan"
const App = () => {
  
  return (
     <>
    <Routes>
  <Route path="/" element={<Login></Login>}></Route>
  <Route path="/login" element={<Login></Login>}></Route>
  <Route path="/signup" element={<Signup></Signup>}></Route>
  <Route path="/kanban" element={<Kanban></Kanban>}></Route>
  

 </Routes>

   
    </>
  )
}

export default App