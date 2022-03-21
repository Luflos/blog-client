import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Blogs({ blogs, setBlogs }) {
  const [formData, setFormData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/blogs`, formData)
      .then((reponse) => {
        setFormData({})
        return axios.get(process.env.REACT_APP_SERVER_URL + "/blogs")
      })
      .then((response) => setBlogs(response.data))
      .catch(console.log)
  }

  const blogLinks = blogs.map((blog, idx) => {
    return (
      <div key={`blog-${idx}`}>
        <Link to={`/blogs/${blog._id}`}> {blog.title}</Link>
      </div>
    )
  })

  return (
    <>
      <h1> See all Blogs</h1>
      {blogLinks}
      <h3>Post a new Blog!</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label htmlFor="content">Content: </label>
          <input
            type="text"
            id="content"
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />

          <input type="submit" />
        </form>
      </div>
    </>
  )
}
