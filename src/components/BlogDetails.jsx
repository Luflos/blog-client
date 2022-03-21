export default function BlogDetails({ blog, comments }) {
  const foundComments = comments.map((comment, idx) => {
    return (
      <div key={`comment-${idx}`}>
        User: <strong>{comment.name}</strong>
        <p>{comment.content}</p>
      </div>
    )
  })

  return (
    <>
      <h1>{blog.title}</h1>
      <h3>By: {blog.name}</h3>
      <p>{blog.content}</p>
      <div>
        <br></br>
        <h3>Comments:</h3>
        {foundComments}
      </div>
    </>
  )
}
