import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import NotFound from "./NotFound"
import BlogDetails from "../BlogDetails"
import axios from "axios"
import BlogEdit from "../BlogEdit"

export default function Blog({ blogs, setBlogs }) {
  const { id } = useParams()
  const [blog, setBlog] = useState([])
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({})

  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
      .then((response) => {
        setBlog(response.data)
        setComments(response.data.comments)
        console.log(response.data)
      })
      .catch(console.log)
  }, [showForm])

  const matchedBlog = blogs.find((blog) => blog._id === id)
  if (!matchedBlog) return <NotFound />

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog._id}`, blogs)
      .then((response) => {
        setBlog({})
        return axios.get(process.env.REACT_APP_SERVER_URL + "/blogs")
      })
      .then((response) => {
        setBlogs(response.data)
        navigate("/blogs")
      })
      .catch(console.log)
  }

  const addComment = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/blogs/${blog._id}/comments`, formData)
      .then((reponse) => {
        setFormData({})
        return axios.get(process.env.REACT_APP_SERVER_URL + `/blogs/{matchedBlog}`)
      })
      .then((response) => setBlogs(response.data))
      .catch(console.log)
  }

  return (
    <>
      {showForm ? (
        <BlogEdit blog={blog} setShowForm={setShowForm} showForm={showForm} />
      ) : (
        <BlogDetails
          blog={blog}
          comments={comments}
          setBlogs={setBlogs}
        />
      )}

      <button onClick={() => setShowForm(!showForm)}>{showForm ? "Return" : "Edit Blog"}</button>
      <br></br>
      <button onClick={handleSubmit}>Delete Blog</button>
      <div>
        <Link to="/blogs">Back to Blogs</Link>
      </div>

      <h3>Post a new comment!</h3>
      <div>
        <form onSubmit={addComment}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
