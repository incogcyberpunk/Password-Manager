import { Link, NavLink } from "react-router-dom";

import Logout from "../pages/logout/logout";
import githubLogo from "../assets/images/github.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "../context/theme.context.jsx";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 639px)");

  return (
    <>
      <nav className={`sticky top-0 z-50 flex items-center w-full px-4 md:px-8 lg:px-16 xl:px-24 py-4 md:py-5 text-white shadow-lg backdrop-blur-xl transition-all ${menuOpen && isMobile ? "pb-10" : ""} ${theme === 'light' ? 'bg-white/70 text-slate-900 border-b border-amber-100' : 'bg-slate-950/70 text-white border-b border-slate-800'}`}>
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


        <div className="hero-title font-semibold text-xl md:text-2xl lg:text-3xl w-full gap-1 flex items-center justify-center">
          <span className="text-teal-700">&lt;</span>
          <span>Pass</span>
          <span className="text-amber-500">Word</span>
          <span className="text-teal-700"> /&gt;</span>
        </div>

        <button
          onClick={toggleTheme}
          className={`text-2xl flex items-center justify-center hover:scale-110 transition-transform p-2 rounded-full ${theme === 'light' ? 'hover:bg-amber-100' : 'hover:bg-slate-800'}`}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>

        <ul className={`${menuOpen ? "flex" : "hidden"} absolute sm:static left-0 py-4 text-base md:text-lg lg:text-xl top-16 w-full ${theme === 'light' ? 'border-t border-amber-200 bg-white/95 text-slate-900' : 'border-t border-slate-800 bg-slate-950/95 text-white'} sm:w-auto sm:bg-none sm:items-center sm:gap-4 lg:gap-8 font-semibold shadow-lg sm:shadow-none`} >
          <li className="w-full flex flex-col gap-3 items-center">

            <NavLink to="/" className="hover:font-extrabold hover:text-teal-700 group flex items-center justify-center gap-2 border border-transparent px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-teal-400" >
              <lord-icon src="https://cdn.lordicon.com/wmwqvixz.json"
                trigger="loop"
                delay="2000"
                style={{ width: "22px", height: "22px" }}
                class={`group-hover:transition relative bottom-0.5 md:w-[25px] md:h-[25px] ${theme === 'light' ? '' : 'invert'}`} ></lord-icon>
              <span className="">Home</span>
            </NavLink>

            <NavLink to="/addcredentials" className="hover:font-extrabold hover:text-amber-500 border border-transparent flex gap-2 px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-amber-300">
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger={isMobile ? "loop" : "hover"}
                delay="2000"
                style={{ width: "22px", height: "22px" }}
                class={`md:w-[25px] md:h-[25px] ${theme === 'light' ? '' : 'invert'}`}
              ></lord-icon>
              <span>Add Credentials</span>
            </NavLink>

            <NavLink to="/vault" className="hover:font-extrabold hover:text-teal-600 border border-transparent px-4 md:px-6 rounded-full flex items-center gap-2 transition-all hover:scale-105 hover:border-teal-300">
              <lord-icon
                src="https://cdn.lordicon.com/lvaninzq.json"
                trigger={isMobile ? "loop" : "hover"}
                delay="2500"
                style={{ width: "22px", height: "22px" }}
                class={`md:w-[25px] md:h-[25px] ${theme === 'light' ? '' : 'invert'}`}
              ></lord-icon>
              <span>My Vault</span>
            </NavLink>

            <NavLink to="https://github.com/IncogCyberpunk/Password-Manager" className="hover:font-extrabold hover:text-slate-700 flex items-center gap-2 md:gap-3 border border-transparent px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-slate-300" >
              <img
                src={githubLogo}
                alt="Github Logo"
                className="rounded-full w-6 md:w-8 lg:w-10"
              />
              <span>GitHub</span>
            </NavLink>
            {!(window.location.href.includes("login") || window.location.href.includes("signup")) ? (
              <NavLink to="/logout" className="hover:font-extrabold hover:text-red-500 border border-transparent px-4 md:px-6 rounded-full transition-all hover:scale-105 hover:border-red-300">
                <Logout />
              </NavLink>
            ) : null}
          </li>
        </ul>

      </nav>
    </>
  );
}
