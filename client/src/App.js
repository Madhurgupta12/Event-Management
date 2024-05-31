import React from 'react'

import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/Login"
import Signup from "./Component/Signup"
import TextEditor from './pages/TextEditor'
import Kanban from "./Component/KanBan"
import Home1 from './RealTime/Home1';
import EditorPage from './RealTime/EditorPage';





import './App.css'

const App = () => {
  
  return (
     <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    <Route path='/real' element={ <Home1 /> } />
     <Route path='/editor/:roomId' element={ <EditorPage /> } />
  <Route path="/login" element={<Login></Login>}></Route>

  <Route path="/signup" element={<Signup></Signup>}></Route>
  <Route path="/kanban" element={<Kanban></Kanban>}></Route>
  


  <Route path="/editor" element={<TextEditor></TextEditor>}></Route>
  

 </Routes>

   
    </>

  )
}

export default App