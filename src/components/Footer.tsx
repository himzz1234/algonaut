import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="col-span-2">
          <Link to="/">
            <img src="/logo.png" width={160} height={160} alt="logo" />
          </Link>
          <p className="mt-3 text-gray-400 text-base sm:text-base max-w-xs">
            Visualize and understand algorithms with clean animations.
          </p>
        </div>

        <div>
          <h3 className="text-white uppercase mb-3 text-xs sm:text-sm">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400 text-base">
            <li>
              <a
                href="#about"
                className="hover:text-green-400 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-green-400 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="hover:text-green-400 transition-colors"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-green-400 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:justify-self-start lg:justify-self-end">
          <h3 className="text-white uppercase mb-3 text-xs sm:text-sm">
            Resources
          </h3>
          <ul className="space-y-2 text-gray-400 text-base">
            <li>
              <a
                href="#docs"
                className="hover:text-green-400 transition-colors"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#tutorials"
                className="hover:text-green-400 transition-colors"
              >
                Tutorials
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className="hover:text-green-400 transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#community"
                className="hover:text-green-400 transition-colors"
              >
                Community
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-2 flex flex-col justify-between sm:justify-start lg:justify-between lg:justify-self-end">
          <div>
            <h3 className="text-white mb-3 uppercase text-xs sm:text-sm">
              Stay Updated
            </h3>
            <form>
              <button className="whitespace-nowrap underline uppercase font-medium text-green-400 transition-colors">
                Sign up for our newsletter →
              </button>
            </form>
          </div>
          <div className="flex flex-col text-gray-400 mt-6 sm:mt-4">
            <h5 className="uppercase text-white text-xs sm:text-sm">
              Follow Us
            </h5>
            <div className="flex gap-4 mt-4 text-xl">
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
        </div>
      </div>
    </footer>
  );
}
