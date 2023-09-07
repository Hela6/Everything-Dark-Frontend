import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-xl">
      <h1 className="text-5xl m-3">Page not found !</h1>
      <div>
        <Link 
        to="/"
        >
            back to homepage
        </Link>
      </div>
    </div>
  )
}
