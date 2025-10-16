import { MdVerified, MdSpeed, MdSecurity, MdFavorite } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black mt-16 border-t border-gray-600/50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Lifeinvader Ads
            </h3>
            <p className="text-gray-300">
              Professional ad generation made simple
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center text-cyan-400">
              <MdVerified className="text-cyan-400 mr-2" />
              <span className="text-sm text-gray-300">
                Trusted by thousands
              </span>
            </div>
            {/* <div className="flex items-center text-amber-700">
              <MdSpeed className="text-cyan-400 mr-2" />
              <span className="text-sm">Lightning fast</span>
            </div>
            <div className="flex items-center text-amber-700">
              <MdSecurity className="text-cyan-400 mr-2" />
              <span className="text-sm">Secure & private</span>
            </div> */}
          </div>

          <div className="border-t border-gray-600/50 pt-6">
            <span className="text-gray-300 text-sm">
              All rights reserved. Copyright © {currentYear} Created By&nbsp;
              <a
                href="https://ravenpixels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                RavenPixels
              </a>
              &nbsp;with&nbsp;
              <MdFavorite className="text-red-400 inline-block" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
