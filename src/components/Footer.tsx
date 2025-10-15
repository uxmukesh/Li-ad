import { MdVerified, MdSpeed, MdSecurity, MdFavorite } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-50 to-orange-50 mt-16 border-t border-amber-200/50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Lifeinvader Ads
            </h3>
            <p className="text-gray-600">
              Professional ad generation made simple
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="flex items-center text-amber-700">
              <MdVerified className="text-orange-600 mr-2" />
              <span className="text-sm">Trusted by thousands</span>
            </div>
            {/* <div className="flex items-center text-amber-700">
              <MdSpeed className="text-orange-600 mr-2" />
              <span className="text-sm">Lightning fast</span>
            </div>
            <div className="flex items-center text-amber-700">
              <MdSecurity className="text-orange-600 mr-2" />
              <span className="text-sm">Secure & private</span>
            </div> */}
          </div>

          <div className="border-t border-amber-200/50 pt-6">
            <p className="text-amber-700 text-sm flex justify-center items-center">
              All rights reserved. Copyright © {currentYear} Created By&nbsp;
              <a
                href="https://ravenpixels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 underline font-medium"
              >
                RavenPixels
              </a>
              &nbsp;with&nbsp;
              <MdFavorite className="text-red-500 text-sm" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
