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

export default function Login() {
  const { login } = useLogin();
  const { theme } = useTheme();
  const radioClick = useRef(null);
  const initialLoad = useRef(true);

  const [eyeState, setEyeState] = useState(eyeCross);
  const [whichRadio, setwhichRadio] = useState("username");
  const [finalLoginData, setFinalLoginData] = useState({});
  const [clickStatus, setClickStatus] = useState(false);
  const [screenWidth, setscreenWidth] = useState(window.innerWidth);

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
      <div className="min-h-screen w-full">
        <Navbar />
        <main className="z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Background>
            <form className={`p-6 md:p-10 rounded-3xl md:rounded-[2rem] z-50 w-full max-w-md md:max-w-2xl mx-auto shadow-2xl backdrop-blur-sm border-2 ${theme === 'light' ? 'bg-white/95 text-gray-900 border-purple-200' : 'bg-slate-800/95 text-white border-slate-700'}`} onSubmit={handleSubmit} onLoad={() => {
              if (initialLoad.current) {
                radioClick.current.focus()
                initialLoad.current = false
              }
            }}>
              <Introduction />
              <div className="font-extrabold text-4xl md:text-5xl lg:text-6xl flex justify-center my-6 md:my-8 transition-all">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                  LOGIN
                </span>
              </div>

              {/* Details Section */
                <div className="flex flex-col items-center space-y-6 md:space-y-8">
                  {/* Email/Username Input */}
                  <div className="flex flex-col items-center w-full space-y-4">
                    <div className="flex flex-col items-center gap-3 w-full">
                      <label
                        htmlFor="emailUsername"
                        className="font-bold text-2xl md:text-3xl lg:text-4xl text-center"
                      >
                        Email or Username
                      </label>

                      <div className="flex gap-4 md:gap-6 items-center justify-center">
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
                            className="font-semibold text-lg md:text-xl lg:text-2xl cursor-pointer"
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
                            className="font-semibold text-lg md:text-xl lg:text-2xl cursor-pointer"
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
                        className="inputField placeholder:text-base md:placeholder:text-lg py-3 md:py-4 pl-5 md:pl-6 pr-5 w-full text-lg md:text-xl transition-all hover:border-purple-400 focus:scale-[1.02] shadow-md"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col gap-4 items-center w-full">
                    <label
                      htmlFor="password"
                      className="font-bold text-2xl md:text-3xl lg:text-4xl text-center"
                    >
                      Password
                    </label>
                    <div className="w-full relative">
                      <input
                        type={eyeState === eyeCross ? "password" : "text"}
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                        className="inputField placeholder:text-base md:placeholder:text-lg py-3 md:py-4 pl-5 md:pl-6 pr-14 md:pr-16 w-full text-lg md:text-xl transition-all hover:border-purple-400 focus:scale-[1.02] shadow-md"
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
                        {screenWidth > 640 && (
                          <div className={`absolute hidden top-10 md:top-12 -right-2 md:-right-5 group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap animate-fade-in ${theme === 'light' ? 'bg-gray-700' : 'bg-gray-600'}`}>
                            {eyeState === eyeCross ? "Show Password" : "Hide Password"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* If no account , signup */}
                  <div className="text-center mt-2 cursor-pointer">
                    <Link to="/signup">
                      <span className="font-semibold text-lg md:text-xl lg:text-2xl underline decoration-2 hover:text-purple-600 transition-colors" style={{ textUnderlineOffset: "5px" }}>
                        Don't Have an Account? Sign Up!
                      </span>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="border-4 md:border-x-4 md:border-y-2 p-4 md:p-5 px-8 md:px-10 border-fuchsia-600 btnField font-bold text-3xl md:text-4xl lg:text-5xl flex gap-3 md:gap-4 items-center hover:scale-105 active:scale-95 transition-transform shadow-xl hover:shadow-2xl"
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
