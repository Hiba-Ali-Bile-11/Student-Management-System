import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const { darkMode, setDarkMode } = useTheme();


  const navLink = ({ isActive }) =>
    `relative px-4 py-2 rounded-full transition-all duration-300
    ${
      isActive
      ?
      "text-cyan-300 bg-white/10 border border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
      :
      "text-white hover:text-cyan-300 hover:bg-white/10"
    }`;


  const closeMenu = () => {
    setIsOpen(false);
  };


  return (

    <nav
      className="
      fixed top-0 left-0 w-full z-50
      bg-[#1E3A8A]/90
      dark:bg-gray-900/90
      backdrop-blur-xl
      border-b border-cyan-400/40
      shadow-lg
      "
    >

      <div
        className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-4
        flex justify-between items-center
        "
      >

        {/* Logo */}

        <NavLink
          to="/"
          onClick={closeMenu}
          className="
          text-2xl sm:text-3xl
          font-extrabold
          bg-gradient-to-r
          from-cyan-300
          via-white
          to-cyan-300
          bg-clip-text
          text-transparent
          "
        >
          StudentMS
        </NavLink>


        {/* Desktop Menu */}

        <ul className="hidden lg:flex items-center gap-5">

          <li><NavLink to="/" className={navLink}>Home</NavLink></li>

          <li><NavLink to="/services" className={navLink}>Services</NavLink></li>

          <li><NavLink to="/about" className={navLink}>About</NavLink></li>

          <li><NavLink to="/contact" className={navLink}>Contact</NavLink></li>

          <li><NavLink to="/members" className={navLink}>Members</NavLink></li>

          <li><NavLink to="/register" className={navLink}>Register</NavLink></li>

          <li><NavLink to="/login" className={navLink}>Login</NavLink></li>


          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
            text-white text-xl
            p-3 rounded-full
            border border-cyan-400
            hover:bg-cyan-400
            hover:text-[#1E3A8A]
            transition
            "
          >
            {
              darkMode
              ?
              <FaSun/>
              :
              <FaMoon/>
            }
          </button>


        </ul>



        {/* Mobile Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
          lg:hidden
          text-white
          text-2xl
          "
        >

          {
            isOpen
            ?
            <FaTimes/>
            :
            <FaBars/>
          }

        </button>


      </div>



      {/* Mobile + Tablet Menu */}

      {
        isOpen && (

          <div
            className="
            lg:hidden
            bg-[#1E3A8A]
            dark:bg-gray-900
            px-6 py-6
            "
          >

            <ul className="
            flex flex-col
            items-center
            gap-5
            ">


              <li>
                <NavLink onClick={closeMenu} to="/" className={navLink}>
                  Home
                </NavLink>
              </li>


              <li>
                <NavLink onClick={closeMenu} to="/services" className={navLink}>
                  Services
                </NavLink>
              </li>


              <li>
                <NavLink onClick={closeMenu} to="/about" className={navLink}>
                  About
                </NavLink>
              </li>


              <li>
                <NavLink onClick={closeMenu} to="/contact" className={navLink}>
                  Contact
                </NavLink>
              </li>


              <li>
                <NavLink onClick={closeMenu} to="/members" className={navLink}>
                  Members
                </NavLink>
              </li>


              <li>
                <NavLink onClick={closeMenu} to="/register" className={navLink}>
                  Register
                </NavLink>
              </li>


              <li>
                <NavLink onClick={closeMenu} to="/login" className={navLink}>
                  Login
                </NavLink>
              </li>


              <button
                onClick={() => setDarkMode(!darkMode)}
                className="
                text-white
                text-xl
                p-3
                rounded-full
                border border-cyan-400
                "
              >

                {
                  darkMode
                  ?
                  <FaSun/>
                  :
                  <FaMoon/>
                }

              </button>


            </ul>

          </div>

        )
      }


    </nav>

  );
}


export default Navbar;