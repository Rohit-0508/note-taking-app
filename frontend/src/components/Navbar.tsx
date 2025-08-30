import hdimage from "../assets/hdImage.png"
interface NavbarProps {
  onSignOut: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignOut }) => {
  return (
    <div className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 w-full">
      <div className="flex items-center gap-2">
        <img src={hdimage} alt="logo" className="w-7 h-7 sm:w-8 sm:h-8" />
        <h1
          className="font-bold text-base sm:text-lg md:text-2xl lg:text-3xl"
          style={{ fontSize: "clamp(1.2rem, 2.1vw, 2.1rem)" }}
        >
          Dashboard
        </h1>
      </div>
      <button
        onClick={onSignOut}
        className="flex items-center gap-1 sm:gap-2 text-blue-600 underline bg-transparent hover:text-blue-800 px-0 py-0 rounded-none shadow-none font-semibold text-sm sm:text-base"
        style={{ background: "none", border: "none" }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;