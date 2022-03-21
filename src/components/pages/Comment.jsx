import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios"

export default function Comment ({blogs, setBlogs}) {
  let navigate = useNavigate()

  const {blogId, commentId} = useParams()
  const [commentForm, setCommentForm] = useState({})

  const matchedBlog = blogs.find((blog) => blog._id === blogId)
  const matchedComment = matchedBlog.comments.find((comment) => comment._id === commentId)
  // console.log((matchedComment))
  
  useEffect(() => {
    setCommentForm(matchedComment)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`, commentForm)
    .then((response) => {
      console.log(response.data)
      navigate(`/blogs/${blogId}`)
    })
    .catch(console.log)
  }

  const deleteComment = (e) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/comments/${commentId}`, commentForm)
      .then((response) => {
        setCommentForm({})
        return axios.get(process.env.REACT_APP_SERVER_URL + "/blogs")
      })
      .then((response) => {
        setBlogs(response.data)
        navigate(`/blogs/${blogId}`)
      })
      .catch(console.log)
  }

  return (
    <div>
      Edit your comment
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={commentForm.name}
          onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
          id="name"
        />
       
        <br></br>
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          value={commentForm.content}
          onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
          id="content"
        />
        <br></br>
        <input type="submit" />
        
      </form>

      <button onClick={deleteComment}>Delete Comment</button>
    </div>
  )
}