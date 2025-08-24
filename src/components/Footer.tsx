import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            AlgoVisua<span className="text-green-400">li</span>zer
          </h2>
        </div>

        <div className="flex justify-center">
          <nav className="flex flex-wrap gap-4 sm:gap-6 text-gray-400 text-sm sm:text-base">
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
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-4">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center text-gray-500 text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} AlgoVisualizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
