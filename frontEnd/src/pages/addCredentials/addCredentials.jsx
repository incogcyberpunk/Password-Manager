import { useState } from "react";

import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";
import useAddCredentials from "../../hooks/useAddCredentials";

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import { useSubmitStatusContext } from "../../context/submitStatus.context";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import { useTheme } from "../../context/theme.context";

export default function AddCredentials() {
  const [eyeState, setEyeState] = useState(eyeCross);
  const { submitStatus } = useSubmitStatusContext();
  const { storeCredentials } = useAddCredentials();
  const isWide = useMediaQuery("(min-width: 640px)");
  const { theme } = useTheme();

  // this initialization is important so as to make the inputs controlled by a state and not controlled by DOM
  const [credentials, setCredentials] = useState({
    websiteName: "",
    loginEmail: "",
    loginPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storeResponse = await storeCredentials(credentials);
    console.log(`in jsx, the submitStatus is ${submitStatus}`)
    console.log(`storeResponse is `, storeResponse);
  };
  return (
    <>
      <div className="page-shell">
        <Navbar />
        <Background>
          <div className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-12">
            <div className={`border w-full max-w-md md:max-w-2xl mx-auto rounded-2xl md:rounded-3xl flex flex-col gap-4 md:gap-5 shadow-2xl backdrop-blur-sm ${theme === 'light' ? 'border-amber-100 bg-white/90' : 'border-slate-700 bg-slate-900/80'}`}>
              <form
                className="w-full px-5 md:px-8 py-6 md:py-8 rounded-lg"
                onSubmit={handleSubmit}
              >
              {/* Introduction Section */}
              <div className="hero-title font-semibold text-2xl sm:text-3xl md:text-4xl text-center flex flex-col gap-3 md:gap-4 items-center justify-center my-4 md:my-5">
                <span className={`${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>Add a new credential</span>
                <span className={`font-medium text-base sm:text-lg md:text-xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  Keep everything you log into organized.
                </span>
                <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl flex flex-col md:flex-row items-center gap-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/whtfgdfm.json"
                    trigger={isWide ? "hover" : "loop"}
                    delay="1000"
                    style={{ width: "40px", height: "40px" }}
                    class="md:w-[50px] md:h-[50px]"
                  ></lord-icon>
                  <span className="underline text-center" style={{ textUnderlineOffset: "4px" }}>Add details of the website</span>
                </span>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-5">
                {/* Name of Website */}
                <div className="flex flex-col items-center w-full">
                  <label
                    htmlFor="websiteName"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                  >
                    Website Name:
                  </label>
                  <input
                    type="text"
                    name="websiteName"
                    placeholder="Enter the website's name"
                    id="websiteName"
                    className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                    onChange={handleChange}
                  />
                </div>

                {/* Email of website */}
                <div className="flex flex-col items-center w-full">
                  <label
                    htmlFor="loginEmail"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl mb-2 text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                  >
                    Login Email:
                  </label>
                  <input
                    type="text"
                    name="loginEmail"
                    placeholder="Enter the login email"
                    id="loginEmail"
                    className="inputField placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-sm sm:text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                    onChange={handleChange}
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-2 items-center w-full">
                  <label
                    htmlFor="password"
                  className={`font-semibold text-lg sm:text-xl md:text-2xl text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                  >
                    Password :
                  </label>
                  <div className="w-full group relative">
                    <input
                      type={eyeState === eyeCross ? "password" : "text"}
                      name="loginPassword"
                      placeholder="Enter the login password"
                      id="loginPassword"
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
                      {/* Tooltip */}
                      {isWide && (
                        <div className={`absolute hidden top-12 md:top-14 -right-2 md:-right-5 group-hover:block text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap ${theme === 'light' ? 'bg-slate-700' : 'bg-slate-600'}`}>
                          {eyeState === eyeCross
                            ? "Show Password"
                            : "Hide Password"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="flex justify-center mt-6 md:mt-8">
                  <button
                    type="submit"
                    className="border-2 p-3 md:p-4 px-6 md:px-8 btnField font-semibold text-xl sm:text-2xl md:text-3xl flex gap-2 md:gap-3 items-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/jgnvfzqg.json"
                      trigger={isWide ? "hover" : "loop"}
                      delay="800"
                      style={{ width: "35px", height: "35px" }}
                      class="md:w-[45px] md:h-[45px]"
                    ></lord-icon>
                    <span className="text-pink-700">Add Details</span>
                  </button>
                </div>
              </div>
              </form>
          </div>
        </div>
      </Background>
      </div>
    </>
  );
}
