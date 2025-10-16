export default function Header() {
  return (
    <header
      className="relative bg-cover bg-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-black/90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      {/* Floating elements with vibrant colors */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-emerald-400/15 rounded-full blur-lg animate-pulse delay-2000"></div>

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <div className="flex items-center justify-center min-h-[280px]">
          <div className="text-center max-w-4xl">
            {/* <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Live Ad Generator
              </span>
            </div> */}

            <h1 className="text-white text-5xl md:text-7xl font-bold mb-0 leading-tight">
              <span className="bg-gradient-to-r from-purple-500 to-purple-800 bg-clip-text text-transparent">
                Lifeinvader Ads
              </span>
            </h1>

            <p className="text-white/90 text-xl md:text-2xl mb-6 max-w-2xl mx-auto leading-relaxed">
              Generate professional ads with policy compliance
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-white/80 text-sm">
                <MdVerified className="text-lg mr-2" />
                Real Estate & Auto
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <MdAutoAwesome className="text-lg mr-2" />
                Smart Templates
              </div>
              <div className="flex items-center text-white/80 text-sm">
                <MdContentCopy className="text-lg mr-2" />
                One-Click Copy
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div> */}
    </header>
  );
}
