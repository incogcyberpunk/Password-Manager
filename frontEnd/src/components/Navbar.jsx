import { Link, NavLink } from "react-router-dom";

import Logout from "../pages/logout/logout";
import githubLogo from "../assets/images/github.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "../context/theme.context.jsx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className={`bg-gradient-to-r from-slate-800 to-slate-900 sticky top-0 z-50 flex items-center w-full px-4 md:px-8 lg:px-32 xl:px-64 py-4 md:py-5 text-white shadow-lg transition-all ${(screen.width < 760 && menuOpen) ? "pb-10" : ""}`}>
        <button
          className="sm:hidden text-2xl flex items-center justify-center hover:scale-110 transition-transform"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={!menuOpen ? "block" : "hidden"}
            style={{ width: "25px", height: "25px" }}
          >
            <RxHamburgerMenu />
          </span>
          <span
            className={menuOpen ? "block" : "hidden"}
            style={{ width: "25px", height: "25px" }}
          >
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="loop"
              delay="1500"
              state="hover-cross-3"
              style={{ width: "25px", height: "25px" }}
              class="invert relative top"
            ></lord-icon>
          </span>
        </button>


        <div className="font-bold text-xl md:text-2xl lg:text-3xl w-full gap-0.5 flex items-center justify-center">
          <span className="text-purple-400">&lt;</span>
          <span>Pass</span>
          <span className="text-green-400">Word</span>
          <span className="text-purple-400"> /&gt;</span>
        </div>

        <button
          onClick={toggleTheme}
          className="text-2xl flex items-center justify-center hover:scale-110 transition-transform p-2 rounded-full hover:bg-slate-700"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>

        <ul className={`${menuOpen ? "flex" : "hidden"} absolute sm:static left-0 py-4 text-base md:text-lg lg:text-xl top-16 w-full border-t-2 border-purple-400 sm:w-auto bg-gradient-to-b from-slate-800 to-slate-900 sm:bg-none sm:items-center sm:gap-6 lg:gap-10 font-semibold shadow-lg sm:shadow-none`} >
          <li className="w-full flex flex-col gap-3 items-center">

            <NavLink to="/" className="hover:font-extrabold hover:text-purple-400 group flex items-center justify-center gap-2 border-x-4 border-purple-500 px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-purple-400" >
              <lord-icon src="https://cdn.lordicon.com/wmwqvixz.json"
                trigger="loop"
                delay="2000"
                style={{ width: "22px", height: "22px" }}
                class="invert group-hover:transition relative bottom-0.5 md:w-[25px] md:h-[25px]" ></lord-icon>
              <span className="">Home</span>
            </NavLink>

            <NavLink to="/addcredentials" className="hover:font-extrabold hover:text-green-400 border-x-4 border-purple-500 flex gap-2 px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-green-400">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger={screen.screenWidth > 640 ? "hover" : "loop"}
                delay="2000"
                style={{ width: "22px", height: "22px" }}
                class="invert md:w-[25px] md:h-[25px]"
              ></lord-icon>
              <span>Add Credentials</span>
            </NavLink>

            <NavLink to="/vault" className="hover:font-extrabold hover:text-pink-400 border-x-4 border-purple-500 px-4 md:px-6 rounded-full flex items-center gap-2 transition-all hover:scale-105 hover:border-pink-400">
              <lord-icon
                src="https://cdn.lordicon.com/lvaninzq.json"
                trigger={screen.screenWidth > 640 ? "hover" : "loop"}
                delay="2500"
                style={{ width: "22px", height: "22px" }}
                class="invert md:w-[25px] md:h-[25px]"
              ></lord-icon>
              <span>My Vault</span>
            </NavLink>

            <NavLink to="https://github.com/IncogCyberpunk/Password-Manager" className="hover:font-extrabold hover:text-blue-400 flex items-center gap-2 md:gap-3 border-x-4 border-purple-500 px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-blue-400" >
              <img
                src={githubLogo}
                alt="Github Logo"
                className="rounded-full w-6 md:w-8 lg:w-10"
              />
              <span>GitHub</span>
            </NavLink>
            {!(window.location.href.includes("login") || window.location.href.includes("signup")) ? (
              <NavLink to="/logout" className="hover:font-extrabold hover:text-red-400 border-x-4 border-purple-500 px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-red-400">
                <Logout />
              </NavLink>
            ) : null}
          </li>
        </ul>

      </nav>
    </>
  );
}
