import { Link } from "react-router-dom"
import { useState } from "react"

export default function Blogs({ blogs }) {
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
    </>
  )
}
