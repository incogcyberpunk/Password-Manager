import toast from "react-hot-toast";

export default function CopyBtn({ textToCopy }) {
  const handleCopy = (e) => {

    e.stopPropagation(); 

    // call to the navigator.clipboard.writeText api to copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log(`Copied: ${textToCopy}`);
        toast.success("Copied to the clipboard !!")
      }).catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

  return (
    <div className="relative group inline-block" onClick={handleCopy} style={{ cursor: "pointer" }} >
      <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "40px",position: "relative",top:"2px",left:"6px" }} class="md:w-[48px] md:h-[48px]" ></lord-icon>
      <div className="absolute top-10 left-1.5 hidden group-hover:block bg-gray-600 text-white w-fit text-xs md:text-sm font-bold py-1 px-3 rounded-lg shadow-lg">
        Copy
      </div>
    </div>
  );
}
