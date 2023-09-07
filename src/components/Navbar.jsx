import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'


export default function Navbar() {
  return (
    <nav className="h-20 flex justify-between items-center text-xl">

        <div>
                 <Link 
      to="/"
      className="mx-10 text-bold text-3xl"
      >
        Everything Dark
      </Link>

           <Link 
      to="/"
      className="mx-6 text-md text-semibold "
      >
        Home
      </Link>
      <Link 
      to="/Category"
      className="mx-6 text-md text-semibold"
      >
        Categories
      </Link>
      <Link 
      to="/Article"
      className="mx-6 text-md text-semibold"
      >
        Articles
      </Link>
      <Link 
      to="/Profile"
      className="mx-6 text-md text-semibold"
      >
        Profile
      </Link>
      <Link 
      to="/Log"
      className="mx-6 text-md text-semibold"
      >
        Log
      </Link> 
        </div>
      
    <div>
        <Searchbar/>
    </div>
     
    </nav>
  )
}
