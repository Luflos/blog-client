import { Link } from "react-router-dom"

export default function BlogDetails({ blog, comments }) {
  const foundComments = comments.map((comment, idx) => {
    return (
      <div key={`comment-${idx}`}>
        User: <strong>{comment.name}</strong>
        <p>{comment.content}</p>
        <Link to={`/comments/${blog._id}/${comment._id}`}> Edit Comment</Link>
        <br></br>
        <br></br>
        <br></br>
      </div>
    )
  })

  return (
    <>
      <h1>{blog.title}</h1>
      <h3>By: {blog.name}</h3>
      <p>{blog.content}</p>
      <div>
        <h3>Comments By:</h3>
        {foundComments}
        <br></br>
      </div>
    </>
  )
}
