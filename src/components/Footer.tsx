"use client";

import { useState } from "react";
import { MdVerified, MdSpeed, MdSecurity, MdFavorite, MdClose } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showUPIModal, setShowUPIModal] = useState(false);
  const upiId = "ravenpixels@ybl";
  const payeeName = "RavenPixels";
  // UPI payment string
  const upiPaymentString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR`;
  // QR code API URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiPaymentString)}`;

  const copyUPIId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy UPI ID: ", err);
    }
  };

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
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  <a
                    href="https://buymeacoffee.com/theravenpixels"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    ☕ Buy me a coffee
                  </a>
                  <button
                    onClick={() => setShowUPIModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    📱 UPI Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Affiliate Links */}
            {/* <div className="text-center">
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
            </div> */}
          </div>

          {/* UPI Payment Modal */}
          {showUPIModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              onClick={() => setShowUPIModal(false)}
            >
              <div
                className="bg-gray-900 rounded-2xl p-6 border border-gray-600/50 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Scan to Pay via UPI
                  </h3>
                  <button
                    onClick={() => setShowUPIModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <MdClose className="text-2xl" />
                  </button>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="UPI QR Code"
                    className="w-64 h-64"
                  />
                </div>

                <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-600/50 mb-4">
                  <p className="text-gray-400 text-xs mb-2 text-center">
                    Or enter UPI ID manually:
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-cyan-400 font-mono text-base font-semibold">
                      {upiId}
                    </code>
                    <button
                      onClick={copyUPIId}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      title="Copy UPI ID"
                    >
                      📋
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowUPIModal(false)}
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}

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
