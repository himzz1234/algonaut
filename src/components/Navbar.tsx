import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="h-[80px] border-b border-green-500/20 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <h1 className="text-xl md:text-3xl font-bold">
              AlgoVisua<span className="text-green-400">li</span>zer
            </h1>
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 flex-1 justify-end mr-8">
          <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
            Algorithms
          </li>
          <li className="text-gray-400 hover:text-green-400 cursor-pointer transition-colors">
            About
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="hidden md:block px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-600 rounded-md transition-colors">
            Login
          </button>

          <button className="md:hidden text-gray-400 hover:text-green-400">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
