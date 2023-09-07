import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Category from "./components/Category"
import Article from "./components/Article"
import Profile from "./components/Profile"
import Log from "./components/Log"
import NotFound from "./components/NotFound"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category" element={<Category/>}/>
      <Route path="/article" element={<Article/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/Log" element={<Log/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App