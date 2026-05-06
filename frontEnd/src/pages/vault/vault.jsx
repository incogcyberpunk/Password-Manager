import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Background from "../../components/Background";
import Navbar from "../../components/Navbar";
import useVault from "../../hooks/useVault";
import CopyBtn from "../../components/CopyBtn";

import { useSubmitStatusContext } from "../../context/submitStatus.context";
import useDeleteCredentials from "../../hooks/deleteCredentials";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useTheme } from "../../context/theme.context";


export default function Vault() {
  const broadcastChannel = new BroadcastChannel("submitStatusChannel");
  
  const [expand, setExpand] = useState(false)
  const {performDelete}= useDeleteCredentials();
  const isWide = useMediaQuery("(min-width: 768px)");
  const isCompact = useMediaQuery("(max-width: 640px)");
  const { theme } = useTheme();

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
  <div className="px-4 md:px-8">
    <div className="grid gap-4 lg:grid-cols-2">
      {retrievedCredentials?.map((item) => (
        <div key={item._id} className={`rounded-3xl border p-5 shadow-xl ${theme === 'light' ? 'border-amber-100 bg-white/90' : 'border-slate-700 bg-slate-900/80'}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={`text-xs uppercase tracking-[0.25em] ${theme === 'light' ? 'text-teal-700/70' : 'text-teal-300/80'}`}>Website</div>
              <div className={`mt-2 text-xl font-semibold break-words ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{item.websiteName}</div>
            </div>
            <CopyBtn textToCopy={item.websiteName} />
          </div>
          <div className="mt-5 space-y-4">
            <div className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-slate-700 bg-slate-800/80'}`}>
              <div className="min-w-0">
                <div className={`text-xs uppercase tracking-[0.2em] ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Login Email</div>
                <div className={`mt-1 text-sm break-all ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>{item.loginEmail}</div>
              </div>
              <CopyBtn textToCopy={item.loginEmail} />
            </div>
            <div className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-slate-700 bg-slate-800/80'}`}>
              <div className="min-w-0">
                <div className={`text-xs uppercase tracking-[0.2em] ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Password</div>
                <div className={`mt-1 text-sm break-all ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>{item.loginPassword}</div>
              </div>
              <CopyBtn textToCopy={item.loginPassword} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )

  const mobileViewTable = (
    <div className="px-3 md:px-4 space-y-3 md:space-y-4 mb-12">
      {retrievedCredentials?.map((item, index) => {
        let whichBg = index % 2 === 0 ? "bg-purple-50" : "bg-white";
        return (
          <div className={`${whichBg} px-4 md:px-5 py-3 md:py-4 rounded-2xl shadow-lg border hover:shadow-2xl transition-all hover:scale-[1.02] ${theme === 'light' ? 'border-amber-100' : 'border-slate-700 bg-slate-900/80'}`} key={item._id}>
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
                <span className={`font-semibold text-lg md:text-xl break-words ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{item.websiteName}</span>
              </div>
              {/* Delete credential button */}
              <div onClick={()=> performDelete(item._id)} className="cursor-pointer hover:scale-110 transition-transform">
                <lord-icon
                  src="https://cdn.lordicon.com/skkahier.json"
                  trigger={isCompact ? "click" : "hover"}
                  state="morph-trash-full-to-empty"
                  style={{ width: "32px", height: '32px' }}>
                </lord-icon>
              </div>
            </div>
            
            {expand && <div className="space-y-2 md:space-y-3 mt-3">

              {/* Login Email */}
              <div className={`flex justify-between items-center py-2 px-2 rounded-lg ${theme === 'light' ? 'bg-white/60' : 'bg-slate-800/80'}`}>
                <span className={`font-semibold text-sm md:text-base text-nowrap mr-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Login Email</span>
                <span className={`text-xs sm:text-sm md:text-base break-all flex-1 mx-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-200'}`}>{item.loginEmail}</span>
                <CopyBtn textToCopy={item.loginEmail} />
              </div>

              {/* Password */}
              <div className={`flex justify-between items-center py-2 px-2 rounded-lg ${theme === 'light' ? 'bg-white/60' : 'bg-slate-800/80'}`}>
                <span className={`font-semibold text-sm md:text-base text-nowrap mr-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Password</span>
                <span className={`text-xs sm:text-sm md:text-base break-all flex-1 mx-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-200'}`}>{item.loginPassword}</span>
                <CopyBtn textToCopy={item.loginPassword} />
              </div>
            </div>}
          </div>
        );
      })}
    </div>
  )


  // `retrievedCredentials && retrievedCredentials.length > 0 ` is done so that credentialsTable is only rendered when it is not null, thus preventing the application breaking down when it is null
  const credentialsContent = retrievedCredentials?.length > 0 && (isWide ? laptopViewTable : mobileViewTable)

  const noCredentialsContent = (
    <h1 className="text-center flex flex-col items-center gap-8 md:gap-14 px-4">
      <span className={`hero-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
        <span>No credentials in the vault</span>
        <lord-icon
          src="https://cdn.lordicon.com/keaiyjcx.json"
          trigger={isCompact ? "loop" : "hover"}
          delay="2000"
          state="hover-error-4"
          style={{width:"35px",height:"35px"}}
          class="relative top-1 md:top-2 left-2 md:left-3 inline-block md:w-[45px] md:h-[45px]">
        </lord-icon>
      </span>
      <button className="border-2 w-[calc(100%-40px)] sm:w-auto p-3 md:p-4 px-4 md:px-6 btnField font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform">
        <Link to="/addcredentials" className="flex items-center justify-center gap-2 md:gap-3">
          <lord-icon
            src="https://cdn.lordicon.com/ahoskycx.json"
            trigger={isCompact ? "loop" : "hover"}
            delay="1500"
            style={{ width: "50px", height: "50px" }}
            class="md:w-[65px] md:h-[65px]"
          ></lord-icon>
          <span
            className={`text-slate-900 ${isCompact ? "text-lg sm:text-xl md:text-2xl" : "text-2xl md:text-3xl"}`}>
            Click to Add Credentials
          </span>
        </Link>
      </button>
    </h1>
  );
  return (
    <>
      <div className="page-shell">
        <Navbar />
        <Background />
        <header className="px-4">
          <div className="hero-title font-semibold w-full max-w-6xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex flex-col gap-2 md:gap-3 items-center justify-center mt-5 mb-8 md:mt-12 md:mb-16 lg:mt-20 lg:mb-20">
            <span className={`text-center ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              Your <span className={`${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>Vault</span>
            </span>
            <span className={`font-medium text-base sm:text-lg md:text-2xl flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              <lord-icon
                src="https://cdn.lordicon.com/nizfqlnk.json"
                trigger={isCompact ? "loop" : "hover"}
                delay="1500"
                style={{ width: "32px", height: "32px" }}
                class="md:w-[45px] md:h-[45px]"
              ></lord-icon>
              <span className="flex items-center gap-2">
                <span>All your credentials in one place</span>
                <lord-icon
                  src="https://cdn.lordicon.com/jpgpblwn.json"
                  trigger="loop"
                  delay="1000"
                  state="loop-scale"
                  style={{ width: "26px", height: "26px" }}
                  class="md:w-[35px] md:h-[35px]"
                ></lord-icon>
              </span>
            </span>
          </div>
        </header>
        <main className="min-h-[50vh] pb-16 md:pb-24">
          {!(retrievedCredentials && retrievedCredentials?.length) > 0 ? noCredentialsContent : credentialsContent}
        </main>
      </div>
    </>
  );
}
