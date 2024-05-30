import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
import Signup from "./Component/Signup"
import TextEditor from './pages/TextEditor'
import Kanban from "./Component/KanBan"
import Home1 from './RealTime/Home1';
import EditorPage from './RealTime/EditorPage';
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
  

 </Routes>

   
    </>
  )
}

export default App