import React from 'react'

import {Routes,Route} from "react-router-dom"
import Home from "./Component/Home"
import Login from "./Component/login"
import TextEditor from './pages/TextEditor'
import Home1 from './RealTime/Home1'
import EditorPage from './RealTime/EditorPage'
import File from './pages/File'
import './App.css';
const App = () => {
  
  return (
     <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    <Route path='/real' element={ <Home1 /> } />
     <Route path='/editor/:roomId' element={ <EditorPage /> } />
  <Route path="/login" element={<Login></Login>}></Route>
  <Route path="/editor" element={<TextEditor></TextEditor>}></Route>
  <Route path="/file" element={<File></File>}></Route>
 </Routes>

   
    </>

   

  )
}

export default App