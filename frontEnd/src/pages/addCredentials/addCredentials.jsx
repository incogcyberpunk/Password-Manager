import { useState } from "react";

import eyeOpen from "../../assets/animatedGIF/eyeOpen.svg";
import eyeCross from "../../assets/animatedGIF/eyeClose.svg";
import useAddCredentials from "../../hooks/useAddCredentials";

import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import { useSubmitStatusContext } from "../../context/submitStatus.context";

export default function AddCredentials() {
  const [eyeState, setEyeState] = useState(eyeCross);
  const { submitStatus } = useSubmitStatusContext();
  const { storeCredentials } = useAddCredentials();

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
      <Navbar />
      <Background>
        <div className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
          <div className="border-4 w-full max-w-md md:max-w-2xl mx-auto border-purple-600 rounded-2xl md:rounded-3xl flex flex-col gap-4 md:gap-5 shadow-2xl bg-white/95 backdrop-blur-sm">
            <form
              className="w-full px-5 md:px-8 py-6 md:py-8 rounded-lg"
              onSubmit={handleSubmit}
            >
              {/* Introduction Section */}
              <div className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-center flex flex-col gap-3 md:gap-4 items-center justify-center my-4 md:my-5">
                <span className="text-green-500">
                  PassWord <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Manager</span>
                </span>
                <span className="font-bold text-xl md:text-2xl lg:text-3xl flex flex-col md:flex-row items-center gap-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/whtfgdfm.json"
                    trigger={screen.width < 640 ? "loop" : "hover"}
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
                    className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center"
                  >
                    Website Name:
                  </label>
                  <input
                    type="text"
                    name="websiteName"
                    placeholder="Enter the website's name"
                    id="websiteName"
                    className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                    onChange={handleChange}
                  />
                </div>

                {/* Email of website */}
                <div className="flex flex-col items-center w-full">
                  <label
                    htmlFor="loginEmail"
                    className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 text-center"
                  >
                    Login Email:
                  </label>
                  <input
                    type="text"
                    name="loginEmail"
                    placeholder="Enter the login email"
                    id="loginEmail"
                    className="inputField placeholder:text-sm md:placeholder:text-base py-2 md:py-3 pl-4 md:pl-5 pr-5 w-full text-base md:text-lg transition-all hover:border-purple-400 focus:scale-[1.02]"
                    onChange={handleChange}
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-2 items-center w-full">
                  <label
                    htmlFor="password"
                    className="font-bold text-xl md:text-2xl lg:text-3xl text-center"
                  >
                    Password :
                  </label>
                  <div className="w-full group relative">
                    <input
                      type={eyeState === eyeCross ? "password" : "text"}
                      name="loginPassword"
                      placeholder="Enter the login password"
                      id="loginPassword"
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
                      {/* Tooltip */}
                      {screen.width > 640 && (
                        <div className="absolute hidden top-12 md:top-14 -right-2 md:-right-5 group-hover:block bg-gray-700 text-white text-xs md:text-sm font-semibold md:font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full shadow-xl z-10 whitespace-nowrap">
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
                    className="border-4 md:border-x-4 md:border-y-2 p-3 md:p-4 px-6 md:px-8 border-fuchsia-600 btnField font-bold text-2xl md:text-3xl lg:text-4xl flex gap-2 md:gap-3 items-center hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-2xl"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/jgnvfzqg.json"
                      trigger={screen.screenWidth > 640 ? "hover" : "loop"}
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
    </>
  );
}
