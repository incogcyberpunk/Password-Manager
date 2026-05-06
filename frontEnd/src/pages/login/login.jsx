/*
STATE UPDATE MECHANISM IN REACT:
https://chatgpt.com/share/675191a1-834c-800a-8c44-1846cead1f02
*/

import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";
import Background from "../../components/Background.jsx";
import Introduction from "../../components/Introduction.jsx";

import useLogin from "../../hooks/useLogin.js";
import { useTheme } from "../../context/theme.context.jsx";
import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";
import Globe from "../../components/Globe.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";

export default function Login() {
  const { login } = useLogin();
  const { theme } = useTheme();
  const radioClick = useRef(null);
  const initialLoad = useRef(true);

  const [eyeState, setEyeState] = useState(eyeCross);
  const [whichRadio, setwhichRadio] = useState("username");
  const [finalLoginData, setFinalLoginData] = useState({});
  const [clickStatus, setClickStatus] = useState(false);
  const isWide = useMediaQuery("(min-width: 640px)");

  let [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // STATE UPDATES ARE ASYNCHRONOUS IN REACT AND ARE BATCHED, SO ARE NOT IMMEDIATELY REFLECTED AND UPDATED IN THE NEXT RENDER CYCLE

  const handleSubmit = (e) => {
    e.preventDefault();
    setClickStatus(true);

    // Set finalLoginData first
    const finalData = {
      password: loginData.password,
      ...(whichRadio === "email"
        ? { email: loginData.email }
        : { username: loginData.username }),
    };

    // this state update (asynchronous process) is scheduled for next render cycle, so it will only be updated after all the sycnhronous code in this function is executed
    setFinalLoginData(finalData);
  };
  useEffect(() => {
    if (clickStatus) {
      login(finalLoginData);
    }
  }, [finalLoginData]);

  return (
    <>
      <div className="page-shell">
        <Navbar />
        <main className="z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-12">
          <Background>
            <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-6 lg:gap-10 items-center">
              <aside className={`hidden lg:flex flex-col justify-between rounded-[2rem] p-10 shadow-2xl border ${theme === 'light' ? 'bg-white/70 border-amber-100' : 'bg-slate-900/70 border-slate-700'}`}>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-teal-700/80">
                    <span className="h-px w-10 bg-teal-500/50"></span>
                    <span>Secure Vault</span>
                  </div>
                  <h2 className="hero-title text-3xl xl:text-4xl mt-4 font-semibold text-slate-900 dark:text-white">
                    Welcome back to your vault.
                  </h2>
                  <p className="mt-4 text-base xl:text-lg text-slate-600 dark:text-slate-300">
                    Access your credentials instantly and keep your digital life organized.
                  </p>
                </div>
                <div className="mt-10 space-y-3 text-sm xl:text-base">
                  <div className={`flex items-center gap-3 rounded-2xl border p-4 ${theme === 'light' ? 'border-amber-100/60 bg-white/70' : 'border-slate-700 bg-slate-800/70'}`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-500"></span>
                    <span>Instant copy and paste</span>
                  </div>
                  <div className={`flex items-center gap-3 rounded-2xl border p-4 ${theme === 'light' ? 'border-amber-100/60 bg-white/70' : 'border-slate-700 bg-slate-800/70'}`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                    <span>Encrypted storage</span>
                  </div>
                </div>
              </aside>
              <form className={`p-6 md:p-10 lg:p-12 rounded-3xl md:rounded-[2rem] z-50 w-full max-w-md md:max-w-2xl mx-auto shadow-2xl backdrop-blur-sm border ${theme === 'light' ? 'bg-white/95 text-slate-900 border-amber-100' : 'bg-slate-800/95 text-white border-slate-700'}`} onSubmit={handleSubmit} onLoad={() => {
                if (initialLoad.current) {
                  radioClick.current.focus()
                  initialLoad.current = false
                }
              }}>
              <div className="lg:hidden">
                <Introduction />
              </div>
              <div className="hero-title font-semibold text-3xl sm:text-4xl md:text-5xl flex justify-center my-6 md:my-8">
                <span className={`${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>Sign in</span>
              </div>

              {/* Details Section */
                <div className="flex flex-col items-center space-y-6 md:space-y-8">
                  {/* Email/Username Input */}
                  <div className="flex flex-col items-center w-full space-y-4">
                    <div className="flex flex-col items-center gap-3 w-full">
                    <label
                      htmlFor="emailUsername"
                      className={`font-semibold text-lg sm:text-xl md:text-2xl text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                    >
                      Email or Username
                    </label>

                      <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center">
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="loginType"
                            id="usernameRadio"
                            className="radio focus:border-none cursor-pointer w-5 h-5 md:w-6 md:h-6"
                            onClick={() => {
                              radioClick.current.focus();
                              setwhichRadio("username");
                            }}
                            defaultChecked
                          />
                          <label
                            htmlFor="usernameRadio"
                            className="font-medium text-sm sm:text-base md:text-lg cursor-pointer"
                          >
                            Username
                          </label>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="loginType"
                            id="emailRadio"
                            className="radio focus:border-none cursor-pointer w-5 h-5 md:w-6 md:h-6"
                            onClick={() => {
                              radioClick.current.focus();
                              setwhichRadio("email");
                            }}
                          />
                          <label
                            htmlFor="emailRadio"
                            className="font-medium text-sm sm:text-base md:text-lg cursor-pointer"
                          >
                            Email
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Input Field */}
                    <div className="w-full">
                      <input
                        ref={radioClick}
                        type="text"
                        name={whichRadio === "email" ? "email" : "username"}
                        value={
                          whichRadio === "email"
                            ? loginData.email
                            : loginData.username
                        }
                        placeholder={whichRadio === "email" ? "Enter your email" : "Enter your username"}
                        id="emailUsername"
                        className="inputField placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg w-full text-base sm:text-lg md:text-xl transition-all focus:scale-[1.01]"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col gap-4 items-center w-full">
                    <label
                      htmlFor="password"
                      className={`font-semibold text-lg sm:text-xl md:text-2xl text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                    >
                      Password
                    </label>
                    <div className="w-full relative">
                      <input
                        type={eyeState === eyeCross ? "password" : "text"}
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                        className="inputField placeholder:text-sm sm:placeholder:text-base md:placeholder:text-lg w-full text-base sm:text-lg md:text-xl transition-all focus:scale-[1.01]"
                        onChange={handleChange}
                      />
                      <div className="group absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
                        <img 
                          onClick={() => {
                            if (eyeState === eyeCross) {
                              setEyeState(eyeOpen);
                            } else {
                              setEyeState(eyeCross);
                            }
                          }}
                          src={eyeState}
                          className="w-6 md:w-8 lg:w-10 cursor-pointer hover:scale-110 transition-transform"
                          alt="Toggle password visibility"
                        />
                        {/* Tooltip */}
                        {isWide && (
                          <div className={`absolute hidden top-10 md:top-12 -right-2 md:-right-5 group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-600'}`}>
                            {eyeState === eyeCross ? "Show Password" : "Hide Password"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* If no account , signup */}
                  <div className="text-center mt-2 cursor-pointer">
                    <Link to="/signup">
                      <span className="font-medium text-sm sm:text-base md:text-lg underline decoration-2 hover:text-teal-700 transition-colors" style={{ textUnderlineOffset: "5px" }}>
                        Don't Have an Account? Sign Up!
                      </span>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="border-2 p-3 sm:p-4 md:p-5 px-6 sm:px-8 md:px-10 btnField font-semibold text-xl sm:text-2xl md:text-3xl flex gap-3 md:gap-4 items-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/nfgmqqvs.json"
                        trigger="loop"
                        delay="3000"
                        style={{ width: "35px", height: "35px" }}
                        class="md:w-[45px] md:h-[45px]"
                      ></lord-icon>
                      <span className={`${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}>Log In</span>
                    </button>
                  </div>
                </div>}
            </form>
          </Background>
        </main>
      </div>
    </>
  );
}
