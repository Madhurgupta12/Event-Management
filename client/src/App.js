import React from 'react'


import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
import TextEditor from './pages/TextEditor'
import Home1 from './RealTime/Home1'
import EditorPage from './RealTime/EditorPage'
import File from './pages/File'
import Calender from "./Component/Calender"
import Remainder from "./Component/Remainder"
import Tree from "./Component/Tree"
import KanBan from "./Component/KanBan"
import Profile from "./Component/Profile"
import Group from './Component/Group'
import './App.css';


// import TextEditor from './pages/TextEditor'
// import Home from './Component/Home'
// import Login from './Component/Login'
import Signup from './Component/Signup'

import './App.css'

const App = () => {
  
  return (
     <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    <Route path='/real' element={ <Home1 /> } />
     <Route path='/editor/:roomId' element={ <EditorPage /> } />
  <Route path="/login" element={<Login></Login>}></Route>
  <Route path="/editor" element={<TextEditor></TextEditor>}></Route>
<Route path="/group" element={<Group></Group>}></Route>
  <Route path="/file" element={<File></File>}></Route>
  <Route path="/task" element={<Calender></Calender>}></Route>
  <Route path="/rem" element={<Remainder></Remainder>}></Route>
  <Route path="/tree" element={<Tree></Tree>}></Route>
  <Route path="/kanban" element={<KanBan></KanBan>}></Route>
  <Route path="/profile" element={<Profile></Profile>}></Route>

  <Route path="/signup" element={<Signup></Signup>}></Route>

 </Routes>

   
    </>

  )
}

export default App