import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-white">
            AlgoVisua<span className="text-green-400">li</span>zer
          </h2>
        </div>

        <div className="flex justify-center">
          <nav className="flex gap-6 text-gray-400 text-sm">
            <a href="#about" className="hover:text-green-400 transition-colors">
              About
            </a>
            <a
              href="#features"
              className="hover:text-green-400 transition-colors"
            >
              Features
            </a>
            <a href="#faqs" className="hover:text-green-400 transition-colors">
              FAQs
            </a>
            <a
              href="#contact"
              className="hover:text-green-400 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="flex justify-center md:justify-end gap-6 text-gray-400 text-xl">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-4">
        © {new Date().getFullYear()} AlgoVisualizer. All rights reserved.
      </div>
    </footer>
  );
}
