import useMediaQuery from "../hooks/useMediaQuery";

export default function Introduction() {
  const isWide = useMediaQuery("(min-width: 640px)");

  return (
    <>
      <div className="max-w-[520px] sm:flex sm:justify-center mt-8 sm:mt-12 sm:mb-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-teal-700/80">
            <span className="h-px w-10 bg-teal-500/50"></span>
            <span>Vault Studio</span>
            <span className="h-px w-10 bg-teal-500/50"></span>
          </div>
          <h1 className="hero-title text-4xl sm:text-6xl my-2 font-semibold">
            <span className="text-teal-700">Pass</span>
            <span className="text-amber-500">Word</span>
          </h1>
          <span className="text-lg sm:text-2xl text-slate-600 font-medium">
            {isWide ? (
              <span>Your calm, secure password space.</span>
            ) : (
              <span>
                <span className="block">Your calm, secure</span>
                <span className="block">password space.</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
