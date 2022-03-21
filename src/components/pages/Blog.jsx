import {useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NotFound from './NotFound'
import BlogDetails from '../BlogDetails'
import axios from 'axios'
import BlogEdit from '../BlogEdit'

export default function Blog ({ blogs }) {

  const {id} = useParams()
  const [blog, setBlog] = useState([])
  const [comments, setComments] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
      .then(response => {
        setBlog(response.data)
        setComments(response.data.comments)
        console.log(response.data)
      })
      .catch(console.log)
  }, [showForm])

  const matchedBlog = blogs.find(blog => blog._id === id)
  if (!matchedBlog) return <NotFound />
  
  return (
    <>
      {/* <BlogDetails blog={blog} comments={comments}/> */}

      {showForm ? <BlogEdit blog={blog} setShowForm={setShowForm} showForm={showForm} /> : <BlogDetails blog={blog} comments={comments} /> }

      <button
      onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Return' : 'Edit Blog'}
      </button>


      <div>
      <Link to='/blogs'>Back to Blogs</Link>
      </div>
      
    </>
  )
}