import React from 'react'
<<<<<<< Updated upstream
import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
=======
import TextEditor from './pages/TextEditor'
>>>>>>> Stashed changes
const App = () => {
  
  return (
<<<<<<< Updated upstream
     <>
    <Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/login" element={<Login></Login>}></Route>
 </Routes>

   
    </>
=======
    <div>
      <TextEditor/>
      </div>
>>>>>>> Stashed changes
  )
}

export default App