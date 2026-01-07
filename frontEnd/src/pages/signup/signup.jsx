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

export default function Signup() {
  const [eyeState, setEyeState] = useState(eyeCross);
  const { theme } = useTheme();
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
      <Navbar />
      <main className="z-10 min-h-screen flex items-center justify-center py-8 md:py-12">
        <Background>
          <form
            className={`w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl backdrop-blur-sm ${theme === 'light' ? 'bg-white/95 text-gray-900' : 'bg-slate-800/95 text-white'}`}
            onSubmit={handleSubmit}
          >
            <Introduction />
            {/* Header Section */}
            <div className="font-extrabold mt-4 mb-4 md:mt-5 md:mb-6 underline text-4xl md:text-5xl lg:text-6xl flex justify-center transition-all">
              <span>
                SIGN<span className="text-green-500">-</span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">UP</span>
              </span>
            </div>

            {/* Form section */}
            <div className="flex pt-3 flex-col gap-4 md:gap-5 items-center">
              {/* Full Name  */}
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="fullName"
                  className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center"
                >
                  Full Name :
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  id="fullName"
                  className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="email"
                  className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center"
                >
                  Email Address:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  id="email"
                  className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="flex flex-col items-center w-full">
                <label
                  htmlFor="username"
                  className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center"
                >
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter a unique username"
                  id="username"
                  className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 items-center w-full">
                <label
                  htmlFor="password"
                  className="font-bold text-xl md:text-2xl lg:text-3xl text-center"
                >
                  Password
                </label>
                <div className="w-full group relative">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="password"
                    placeholder="Create a strong password"
                    id="password"
                    className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-12 md:pr-16 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
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
                    <div className={`absolute -right-2 md:-right-5 hidden group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap ${theme === 'light' ? 'bg-gray-700' : 'bg-gray-600'}`}>
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/*Confirm Password */}
              <div className="flex flex-col gap-2 items-center w-full">
                <label
                  htmlFor="confirmPassword"
                  className="font-bold text-xl md:text-2xl lg:text-3xl text-center"
                >
                  Confirm Password
                </label>
                <div className="w-full group relative">
                  <input
                    type={eyeState === eyeCross ? "password" : "text"}
                    name="confirmPassword"
                    placeholder="Enter the password again"
                    id="confirmPassword"
                    className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-12 md:pr-16 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
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
                    <div className={`absolute -right-2 md:-right-5 hidden group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap ${theme === 'light' ? 'bg-gray-700' : 'bg-gray-600'}`}>
                      {eyeState === eyeCross
                        ? "Show Password"
                        : "Hide Password"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gender input */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 items-center justify-center mt-3 md:mt-6 w-full">
                <div className="font-bold text-xl md:text-2xl lg:text-3xl">
                  <span>
                    Gender <span className="text-green-600 text-lg md:text-xl lg:text-2xl">-&gt;</span>
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
                    className="font-semibold text-base md:text-xl lg:text-2xl underline decoration-2 hover:text-purple-600 transition-colors" style={{textUnderlineOffset:"4px"}}
                  >
                    Already Have an Account? Log In !
                  </span>
                </Link>
              </div>

              {/* Submit Section */}
              <div className="flex justify-center mt-6 md:mt-8">
                <button
                  type="submit"
                  className="border-4 md:border-x-4 md:border-y-2 p-3 md:p-4 px-6 md:px-8 border-fuchsia-600 btnField font-bold text-2xl md:text-3xl lg:text-4xl flex gap-2 md:gap-3 items-center hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-2xl"
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
        </Background>
      </main>
    </>
  );
}
