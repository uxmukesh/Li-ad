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

          {/* Monetization Section */}
          <div className="border-t border-gray-600/50 pt-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-2">Support this tool:</p>
                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  ☕ Buy me a coffee
                </a>
              </div>
            </div>

            {/* Affiliate Links */}
            <div className="text-center">
              <p className="text-gray-400 text-xs mb-2">
                Recommended services:
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <a
                  href="https://www.zillow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Zillow
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="https://www.carmax.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  CarMax
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="https://www.match.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Match.com
                </a>
                <span className="text-gray-500">•</span>
                <a
                  href="https://www.quickbooks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  QuickBooks
                </a>
              </div>
            </div>
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
