import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar.jsx";
import Background from "../../components/Background.jsx";
import Introduction from "../../components/Introduction.jsx";

import useSignup from "../../hooks/useSignup.js";
import { useTheme } from "../../context/theme.context.jsx";
import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";

import Radio from "../../components/Radio.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";

export default function Signup() {
  const [eyeState, setEyeState] = useState(eyeCross);
  const { theme } = useTheme();
  const isWide = useMediaQuery("(min-width: 640px)");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const {signup}= useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData({ ...signupData, [name]: value }); // says to destructure the object and then update the key(name) with the value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(signupData);
    await signup(signupData);
  };

  return (
    <>
      <div className="page-shell">
        <Navbar />
        <main className="z-10 min-h-screen flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-12">
          <Background>
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-stretch">
              <aside className={`hidden lg:flex flex-col justify-between rounded-3xl p-8 xl:p-10 border shadow-2xl backdrop-blur-sm ${theme === 'light' ? 'bg-white/70 border-amber-100 text-slate-900' : 'bg-slate-900/70 border-slate-700 text-white'}`}>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-teal-700/80">
                    <span className="h-px w-10 bg-teal-500/50"></span>
                    <span>Vault Studio</span>
                  </div>
                  <h2 className="hero-title text-3xl xl:text-4xl mt-4 font-semibold">
                    Create your private vault.
                  </h2>
                  <p className="mt-4 text-base xl:text-lg text-slate-600 dark:text-slate-300">
                    Store credentials, sync across devices, and keep everything locked down.
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
              <form
                className={`w-full max-w-md md:max-w-2xl lg:max-w-none mx-auto p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-2xl backdrop-blur-sm border ${theme === 'light' ? 'bg-white/95 text-slate-900 border-amber-100' : 'bg-slate-800/95 text-white border-slate-700'}`}
                onSubmit={handleSubmit}
              >
                <div className="lg:hidden">
                  <Introduction />
                </div>
            {/* Header Section */}
              <div className="hero-title font-semibold mt-4 mb-4 md:mt-5 md:mb-6 text-3xl sm:text-4xl md:text-5xl flex justify-center transition-all">
                <span>
                <span className={`${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>Sign up</span>
                </span>
              </div>

            {/* Form section */}
            <div className="flex pt-3 flex-col gap-4 md:gap-5 items-center">
              {/* Full Name  */}
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="fullName"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  Full Name :
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  id="fullName"
                  className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="email"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  Email Address:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  id="email"
                  className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="username"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter a unique username"
                  id="username"
                  className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 items-center w-full">
                <label
                  htmlFor="password"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  Password
                </label>
                <div className="w-full group relative">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="password"
                    placeholder="Create a strong password"
                    id="password"
                    className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-12 md:pr-16 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                    onChange={handleChange}
                  />
                  <div className="group">
                    <img
                      onClick={() => {
                        if (eyeState === eyeCross) {
                          setEyeState(eyeOpen);
                        } else {
                          setEyeState(eyeCross);
                        }
                      }}
                      src={eyeState}
                      className="absolute w-6 md:w-8 lg:w-10 right-3 md:right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      alt=""
                    />
                    {isWide && (
                      <div className={`absolute -right-2 md:-right-5 hidden group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-600'}`}>
                        {eyeState === eyeCross
                          ? "Show Password"
                          : "Hide Password"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/*Confirm Password */}
              <div className="flex flex-col gap-2 items-center w-full">
                <label
                  htmlFor="confirmPassword"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  Confirm Password
                </label>
                <div className="w-full group relative">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="confirmPassword"
                    placeholder="Enter the password again"
                    id="confirmPassword"
                    className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-12 md:pr-16 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                    onChange={handleChange}
                  />
                  <div className="group">
                    <img
                      onClick={() => {
                        if (eyeState === eyeCross) {
                          setEyeState(eyeOpen);
                        } else {
                          setEyeState(eyeCross);
                        }
                      }}
                      src={eyeState}
                      className="absolute w-6 md:w-8 lg:w-10 right-3 md:right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      alt=""
                    />
                    {isWide && (
                      <div className={`absolute -right-2 md:-right-5 hidden group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-600'}`}>
                        {eyeState === eyeCross
                          ? "Show Password"
                          : "Hide Password"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Gender input */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 items-center justify-center mt-3 md:mt-6 w-full">
                <div className={`font-semibold text-lg sm:text-xl md:text-2xl ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                  <span>
                    Gender <span className="text-amber-500 text-lg md:text-xl">-&gt;</span>
                  </span>
                </div>
                <div className="flex flex-row md:flex-col gap-3 md:gap-2">
                  <Radio
                    displayText="Male"
                    radioId="maleRadio"
                    radioName="gender"
                    value="male"
                    defaultChecked
                    onChange={handleChange}
                  />
                  <Radio
                    displayText="Female"
                    radioId="femaleRadio"
                    radioName="gender"
                    value="female"
                    onChange={handleChange}
                  />
                  <Radio
                    displayText="Others"
                    radioId="othersRadio"
                    radioName="gender"
                    value="others"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Don't have an account? */}
              <div className="text-center mt-4 md:mt-6 cursor-pointer">
                <Link to="/login">
                  <span
                    className="font-medium text-sm sm:text-base md:text-lg underline decoration-2 hover:text-teal-700 transition-colors" style={{textUnderlineOffset:"4px"}}
                  >
                    Already Have an Account? Log In !
                  </span>
                </Link>
              </div>

              {/* Submit Section */}
              <div className="flex justify-center mt-6 md:mt-8">
                <button
                  type="submit"
                  className="border-2 p-3 md:p-4 px-6 md:px-8 btnField font-semibold text-xl sm:text-2xl md:text-3xl flex gap-2 md:gap-3 items-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/nfgmqqvs.json"
                    trigger="loop"
                    delay="3000"
                    style={{ width: "35px", height: "35px" }}
                    class="md:w-[45px] md:h-[45px]"
                  ></lord-icon>
                  <span className={`${theme === 'light' ? 'text-pink-700' : 'text-pink-300'}`}>Sign Up</span>
                </button>
              </div>
            </div>
              </form>
            </div>
          </Background>
        </main>
      </div>
    </>
  );
}
