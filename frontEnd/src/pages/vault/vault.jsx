import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import useVault from "../../hooks/useVault";
import CopyBtn from "../../components/CopyBtn";

import { useSubmitStatusContext } from "../../context/submitStatus.context";
import useDeleteCredentials from "../../hooks/deleteCredentials";


export default function Vault() {
  const broadcastChannel = new BroadcastChannel("submitStatusChannel");
  
  const [expand, setExpand] = useState(false)
  const {performDelete}= useDeleteCredentials();

  const { retrieveCredentials, retrievedCredentials = [], setRetrievedCredentials } = useVault();

  const { submitStatus, setSubmitStatus } = useSubmitStatusContext();

  const initialRender = useRef(true);

  // useEffect for retrieving credentials from the server when submitStatus is true or when the component is initially rendered
  useEffect(() => {
    if (submitStatus || (initialRender.current && window.location.href.includes("/vault"))) {
      retrieveCredentials()?.then((data) => {
        setRetrievedCredentials(data);
        setSubmitStatus(false);
      }).catch((err) => {
        console.error("Error retrieving credentials:", err);
        setRetrievedCredentials([]);
      });
    }

    console.log(`for broadcastChannel the submitStatus is ${submitStatus}`)
    // this method automatically adds an event listener to the broadcastChannel and listens for messages
    broadcastChannel.onmessage = (e) => {
      const { submitStatus } = e.data;
      console.log(`message received : `, e);
      
      if (submitStatus) {
        console.log(
          "Received update of submitStatus from the BroadcastChannel",
        );
        setSubmitStatus(false);
      }
    };

    // BroadcastChannel sets up a event listener so , necessary to use cleanup function to remove previous event listener to prevent memory leaks
    return () => {
      broadcastChannel.close();
      initialRender.current = false;
    };
  }, [submitStatus]);

  // // useEffect's primary purpose it to listen for updates to states , so here used to listen for updates to submitStatus from the broadcastChannel
  // useEffect(() => {
  //   // this method automatically adds an event listener to the broadcastChannel and listens for messages
  //   broadcastChannel.onmessage = (e) => {
  //     const { submitStatus } = e.data;
  //     console.log(`message received : `, e);
  //     if (submitStatus) {
  //       console.log(
  //         "Received update of submitStatus from the BroadcastChannel",
  //       );
  //       setSubmitStatus(false);
  //     }
  //   };

  //   // BroadcastChannel sets up a event listener so , necessary to use cleanup function to remove previous event listener to prevent memory leaks
  //   return () => {
  //     broadcastChannel.close();
  //   };

  //   //An empty dependency array is used because the BroadcastChannel setup doesn't rely on any state or props and should initialize only once for the component's lifetime
  // }, []);

  const laptopViewTable = (
  <div className="overflow-x-auto px-4 md:px-8">
    <table
      className="bg-purple-100 mx-auto overflow-hidden rounded-3xl text-lg md:text-xl lg:text-2xl border-gray-300 mb-20 md:mb-40 min-w-[900px] shadow-2xl"
    >
      <thead>
        <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <th className="px-4 md:px-6 py-3 md:py-4 border-b border-r text-2xl md:text-3xl border-purple-400">
            Website{" "}
          </th>
          <th className="px-4 md:px-6 py-3 md:py-4 border-b border-r text-2xl md:text-3xl border-purple-400">
            Login Email
          </th>
          <th className="px-4 md:px-6 py-3 md:py-4 border-b border-r text-2xl md:text-3xl border-purple-400">
            Password
          </th>
        </tr>
      </thead>
      <tbody>
        {retrievedCredentials?.map((item, index) => {
          let whichBg = index % 2 === 0 ? "bg-purple-50" : "bg-white ";

          return (
            <tr className={`${whichBg} text-center hover:bg-purple-100 transition-colors`} key={item._id}>
              <td>
                {/* `td` are not block-level element that are table's layout's part and flex requires a block-level or inline-block element so used a div to use flex properly */}
                <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b-2 border-r-2 hover:bg-green-300 border-gray-300 transition-colors">
                  <span className="w-full break-words">{item.websiteName}</span>
                  <span className="ml-2">
                    <CopyBtn textToCopy={item.websiteName} />
                  </span>
                </div>
              </td>

              <td>
                <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b-2 border-r-2 hover:bg-green-300 border-gray-300 transition-colors">
                  <span className="w-full break-words">{item.loginEmail}</span>
                  <span className="ml-2">
                    <CopyBtn textToCopy={item.loginEmail} />
                  </span>
                </div>
              </td>

              <td>
                <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 border-b-2 border-r-2 hover:bg-green-300 border-gray-300 transition-colors">
                  <span className="w-full break-words">{item.loginPassword}</span>
                  <span className="ml-2">
                    <CopyBtn textToCopy={item.loginPassword} />
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  )

  const mobileViewTable = (
    <div className="px-3 md:px-4 space-y-3 md:space-y-4 mb-12">
      {retrievedCredentials?.map((item, index) => {
        let whichBg = index % 2 === 0 ? "bg-purple-50" : "bg-white";
        return (
          <div className={`${whichBg} px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg border-2 border-purple-600 hover:shadow-2xl transition-all hover:scale-[1.02]`} key={item._id}>
            {/* Website name and delete entire credential */}
            <div className={`flex justify-between items-center ${expand && "border-b-2 border-purple-400 pb-2"}`}>
              {/* Expand/Collapse button */}
              <div onClick={() => setExpand(!expand)} className="cursor-pointer hover:scale-110 transition-transform">
                <lord-icon
                  src={!expand ? "https://cdn.lordicon.com/xcrjfuzb.json" : "https://cdn.lordicon.com/ternnbni.json"}
                  trigger="loop"
                  delay="2000"
                  style={{ width: "32px", height: '32px' }}>
                </lord-icon>
              </div>
              {/* Website Name */}
              <div className="flex items-center flex-1 mx-3">
                <span className="text-gray-800 font-extrabold text-2xl md:text-3xl break-words">{item.websiteName}</span>
              </div>
              {/* Delete credential button */}
              <div onClick={()=> performDelete(item._id)} className="cursor-pointer hover:scale-110 transition-transform">
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger={screen.width < 640 ? "click" : "hover"}
                  state="morph-trash-full-to-empty"
                  style={{ width: "32px", height: '32px' }}>
                </lord-icon>
              </div>
            </div>
            
            {expand && <div className="space-y-2 md:space-y-3 mt-3">

              {/* Login Email */}
              <div className="flex justify-between items-center py-2 px-2 bg-white/50 rounded-lg">
                <span className="font-extrabold underline text-base md:text-lg text-gray-900 text-nowrap mr-2">Login Email :</span>
                <span className="text-gray-800 text-sm md:text-base break-all flex-1 mx-2">{item.loginEmail}</span>
                <CopyBtn textToCopy={item.loginEmail} />
              </div>

              {/* Password */}
              <div className="flex justify-between items-center py-2 px-2 bg-white/50 rounded-lg">
                <span className="font-extrabold underline text-base md:text-lg text-gray-900 text-nowrap mr-2">Password :</span>
                <span className="text-gray-800 text-sm md:text-base break-all flex-1 mx-2">{item.loginPassword}</span>
                <CopyBtn textToCopy={item.loginPassword} />
              </div>
            </div>}
          </div>
        );
      })}
    </div>
  )


  // `retrievedCredentials && retrievedCredentials.length > 0 ` is done so that credentialsTable is only rendered when it is not null, thus preventing the application breaking down when it is null
  const credentialsContent = retrievedCredentials?.length > 0 && (screen.width < 768 ? mobileViewTable : laptopViewTable)

  const noCredentialsContent = (
    <h1 className="text-center flex flex-col items-center gap-8 md:gap-14 px-4">
      <span className="text-3xl md:text-5xl lg:text-7xl font-bold">
        <span>No credentials in the vault</span>
        <lord-icon
          src="https://cdn.lordicon.com/keaiyjcx.json"
          trigger={screen.width < 640 ? "loop" : "hover"}
          delay="2000"
          state="hover-error-4"
          style={{width:"35px",height:"35px"}}
          class="relative top-1 md:top-2 left-2 md:left-3 inline-block md:w-[45px] md:h-[45px]">
        </lord-icon>
      </span>
      <button className="border-4 md:border-x-4 md:border-y-2 w-[calc(100%-40px)] sm:w-auto p-3 md:p-4 px-4 md:px-6 border-fuchsia-600 btnField font-bold hover:scale-105 active:scale-95 transition-transform shadow-lg hover:shadow-2xl">
        <Link to="/addcredentials" className="flex items-center justify-center gap-2 md:gap-3">
          <lord-icon
            src="https://cdn.lordicon.com/ahoskycx.json"
            trigger={screen.width < 640 ? "loop" : "hover"}
            delay="1500"
            style={{ width: "50px", height: "50px" }}
            class="md:w-[65px] md:h-[65px]"
          ></lord-icon>
          <span
            className={`text-pink-700 ${screen.width < 640 ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"}`}>
            Click to Add Credentials
          </span>
        </Link>
      </button>
    </h1>
  );
  return (
    <>
      <Navbar />
      <Background />
      <header className="px-4">
        <div className="font-extrabold w-full max-w-7xl mx-auto text-4xl md:text-5xl lg:text-6xl flex flex-col gap-2 md:gap-3 items-center justify-center mt-5 mb-8 md:mt-12 md:mb-16 lg:mt-20 lg:mb-20">
          <span className="text-green-500 text-center">
            Your <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Vault</span>
          </span>
          <span className="font-bold text-xl md:text-2xl lg:text-3xl flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/nizfqlnk.json"
              trigger={screen.screenWidth > 640 ? "hover" : "loop"}
              delay="1500"
              style={{ width: "35px", height: "35px" }}
              class="md:w-[45px] md:h-[45px]"
            ></lord-icon>
            <span className="flex items-center gap-2">
              <span>All your credentials in one place</span>
              <lord-icon
                src="https://cdn.lordicon.com/jpgpblwn.json"
                trigger="loop"
                delay="1000"
                state="loop-scale"
                style={{ width: "28px", height: "28px" }}
                class="md:w-[35px] md:h-[35px]"
              ></lord-icon>
            </span>
          </span>
        </div>
      </header>
      <main className="min-h-[50vh]">
        {!(retrievedCredentials && retrievedCredentials?.length) > 0 ? noCredentialsContent : credentialsContent}
      </main>
      <Background />
    </>
  );
}
