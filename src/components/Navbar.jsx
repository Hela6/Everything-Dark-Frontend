import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useState } from 'react'
import menu from '../assets/img/menu.svg'
import cross from '../assets/img/cross.svg'
import Image from '../assets/img/whitemoon.png'

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)

    const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="fixed top-0 py-8 lg:py-10 w-full flex items-center justify-between text-xl bg-[#0b0c0e] shadow-2xl shadow-zinc-700">

   <div className="flex-row pb-2 w-80 mx-6">
  <Link to="/" className="text-2xl flex items-center" onClick={closeMenu}>
    Everything Dark
    <img className="w-5 pt-2 ml-2" src={Image} alt="image of whitemoon" />
  </Link>
<div className="lg:hidden mt-2">
<SearchBar
       className="inline-block text-sm py-2  mx-4"
       />
</div>

  </div>

      <div className={`${showMenu ? "flex" : "hidden"} flex-col items-center bg-[#0b0c0e] w-full absolute top-full h-screen lg:flex lg:relative lg:flex-row lg:items-center lg:justify-end lg:h-2 lg:mx-6`}>
                        
      <Link 
      to="/"
      className="inline-block py-2 mb-10 lg:mb-0 pt-48 lg:pt-2 mx-4 text-lg"
      onClick={closeMenu} 
      >
        Home
      </Link>
      <Link 
      to="/Category"
      className="inline-block y-2 mb-10 lg:mb-0 mx-4 text-lg"
      onClick={closeMenu} 
      >
        Categories
      </Link>
      <Link 
      to="/Profile"
      className="inline-block py-2 mb-10 lg:mb-0 mx-4 text-lg"
      onClick={closeMenu} 
      >
        Profile
      </Link>
      <Link 
      to="/Log"
      className="inline-block py-2 mb-10 lg:mb-0 mx-4 text-lg"
      onClick={closeMenu} 
      >
        Log
      </Link> 
      <div className="hidden lg:block">
        <SearchBar
       className="inline-block py-2 mb-10 lg:mb-0 mx-4"
       />
      </div>
       
        </div>
    
     <button
     onClick={() => setShowMenu(!showMenu)}
     className="p-4 lg:hidden"
     >
      <img 
      className="w-4"
      src={showMenu ? cross : menu} alt="toggle menu"/>
     </button>
    </nav>
  )
}
