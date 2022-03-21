import { useState } from "react"
import axios from "axios"

export default function BlogEdit({ blog, setShowForm, showForm }) {
  const [blogForm, setBlogForm] = useState(blog)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog._id}`, blogForm)
      .then((response) => {
        console.log(response.data)
        setShowForm(!showForm)
      })
      .catch(console.log)
  }

  return (
    <>
      <h1> Edit the Blog</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={blogForm.name}
          onChange={(e) => setBlogForm({ ...blogForm, name: e.target.value })}
          id="name"
        />
        <br></br>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={blogForm.title}
          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
          id="title"
        />
        <br></br>
        <label htmlFor="name">Content:</label>
        <input
          type="text"
          value={blogForm.content}
          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
          id="content"
        />
        <br></br>
        <input type="submit" />
        
      </form>
    </>
  )
}
