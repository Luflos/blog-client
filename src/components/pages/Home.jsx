import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <>
      <h1> Welcome to the Blogs!</h1>
      <Link to='/blogs'>See All Blogs</Link>
    </>
  )
}