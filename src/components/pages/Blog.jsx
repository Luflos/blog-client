import {useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NotFound from './NotFound'
import BlogDetails from '../BlogDetails'
import axios from 'axios'

export default function Blog ({ blogs }) {

  const {id} = useParams()
  const [blog, setBlog] = useState([])
  const [comments, setComments] = useState([])

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
      .then(response => {
        setBlog(response.data)
        setComments(response.data.comments)
        console.log(response.data)
      })
      .catch(console.log)
  }, [])

  const matchedBlog = blogs.map(blog => blog._id === id)
  if (!matchedBlog) return <NotFound />
  
  return (
    <>
      <BlogDetails blog={blog} comments={comments}/>
      <div>
      <Link to='/blogs'>Back to Blogs</Link>
      </div>
      
    </>
  )
}