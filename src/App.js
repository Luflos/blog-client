import "./App.css"
import Home from "./components/pages/Home"
import Blog from "./components/pages/Blog"
import Blogs from "./components/pages/Blogs"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Comment from "./components/pages/Comment"

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/blogs")
      .then((response) => {
        setBlogs(response.data)
        // console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blogs" element={<Blogs blogs={blogs} setBlogs={setBlogs}/>} />

          <Route path="/blogs/:id" element={<Blog blogs={blogs} setBlogs={setBlogs}/>} />

          <Route path="/comments/:blogId/:commentId" element={<Comment blogs={blogs} setBlogs={setBlogs}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
