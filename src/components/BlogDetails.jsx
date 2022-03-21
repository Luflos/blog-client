
export default function BlogDetails ({ blog, comments }) {

   const foundComments = comments.map((comment, idx) => {
      return (
        <>
        <h4> {comment.name}</h4>
        <p>{comment.content}</p>
        </>
      )
    })

  return (
    <>
      <h1>{blog.title}</h1>
      <h3>By: {blog.name}</h3>
      <p>{blog.content}</p>
      <div>
      Comments:
      {foundComments}
      </div>
    </>
  )
}