import { useState, useEffect } from 'react'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 300)
          return 100
        }
        return prev + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a1628] via-[#1a2942] to-[#0a1628] overflow-hidden">
      {/* Stars/particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30 sm:opacity-40 animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Loading text */}
        <div className="text-center mb-6 sm:mb-10 md:mb-14">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light/90 tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em]">
            LOADING..
          </h1>
        </div>

        {/* Large glowing sphere */}
        <div className="relative mb-6 sm:mb-10 md:mb-14">
          {/* Outer glow layers */}
          <div className="absolute inset-0 -m-12 sm:-m-20 md:-m-24 lg:-m-32">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-[40px] sm:blur-[60px] md:blur-[80px] lg:blur-[100px] animate-pulse"></div>
            <div className="absolute inset-2 sm:inset-4 rounded-full bg-secondary/15 blur-[30px] sm:blur-[40px] md:blur-[60px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Main sphere container */}
          <div className="relative w-36 h-36 sm:w-52 sm:h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
            {/* Rotating outer ring */}
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 -ml-0.75 sm:-ml-1 -mt-0.75 sm:-mt-1 bg-primary rounded-full shadow-lg shadow-primary/70"></div>
            </div>

            {/* Middle rotating ring */}
            <div className="absolute inset-3 sm:inset-4 md:inset-6 rounded-full border border-secondary/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute top-0 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 -ml-0.5 sm:-ml-0.75 -mt-0.5 sm:-mt-0.75 bg-secondary rounded-full shadow-lg shadow-secondary/70"></div>
            </div>

            {/* Main glowing sphere */}
            <div className="absolute inset-6 sm:inset-8 md:inset-12 rounded-full bg-gradient-to-br from-[#2a4a6a]/40 via-[#1a3a5a]/30 to-[#0a2a4a]/40 backdrop-blur-sm border border-primary/20 shadow-2xl shadow-primary/30 overflow-hidden">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse"></div>
              
              {/* Rotating gradient overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-secondary/20 to-transparent animate-spin" style={{ animationDuration: '8s' }}></div>
              
              {/* Grid pattern on sphere */}
              <div className="absolute inset-0 rounded-full opacity-20" style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 30%, transparent 40%, rgba(14, 165, 233, 0.1) 40%, rgba(14, 165, 233, 0.1) 41%, transparent 41%),
                  radial-gradient(circle at 70% 70%, transparent 40%, rgba(56, 189, 248, 0.1) 40%, rgba(56, 189, 248, 0.1) 41%, transparent 41%)
                `,
                backgroundSize: '30px 30px'
              }}></div>

              {/* Highlight on sphere */}
              <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-lg sm:blur-xl"></div>
            </div>

            {/* Inner core glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/30 blur-xl sm:blur-2xl animate-pulse"></div>
          </div>
        </div>

        {/* Percentage */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary/80 tabular-nums">
            {progress}%
          </div>
        </div>
      </div>

      {/* Bottom landscape silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 lg:h-48 pointer-events-none">
        {/* Houses silhouette */}
        <svg className="absolute bottom-0 w-full h-full opacity-20 sm:opacity-30" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="houseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a2a4a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1a3a5a" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* House 1 */}
          <polygon points="50,200 50,120 100,80 150,120 150,200" fill="url(#houseGradient)" />
          <polygon points="75,120 100,95 125,120" fill="#0a2a4a" opacity="0.6" />
          <rect x="80" y="150" width="15" height="20" fill="#0ea5e9" opacity="0.3" />
          <rect x="105" y="150" width="15" height="20" fill="#0ea5e9" opacity="0.3" />
          
          {/* House 2 */}
          <polygon points="200,200 200,140 240,110 280,140 280,200" fill="url(#houseGradient)" />
          <polygon points="220,140 240,120 260,140" fill="#0a2a4a" opacity="0.6" />
          <rect x="220" y="160" width="12" height="15" fill="#38bdf8" opacity="0.3" />
          <rect x="248" y="160" width="12" height="15" fill="#38bdf8" opacity="0.3" />
          
          {/* House 3 */}
          <polygon points="320,200 320,130 370,90 420,130 420,200" fill="url(#houseGradient)" />
          <polygon points="345,130 370,105 395,130" fill="#0a2a4a" opacity="0.6" />
          <rect x="345" y="150" width="18" height="25" fill="#0ea5e9" opacity="0.3" />
          <rect x="377" y="150" width="18" height="25" fill="#0ea5e9" opacity="0.3" />
          
          {/* House 4 - Small */}
          <polygon points="460,200 460,160 490,140 520,160 520,200" fill="url(#houseGradient)" />
          <polygon points="475,160 490,145 505,160" fill="#0a2a4a" opacity="0.6" />
          
          {/* House 5 */}
          <polygon points="900,200 900,135 950,95 1000,135 1000,200" fill="url(#houseGradient)" />
          <polygon points="925,135 950,110 975,135" fill="#0a2a4a" opacity="0.6" />
          <rect x="925" y="155" width="15" height="20" fill="#38bdf8" opacity="0.3" />
          <rect x="960" y="155" width="15" height="20" fill="#38bdf8" opacity="0.3" />
          
          {/* House 6 */}
          <polygon points="1040,200 1040,145 1090,110 1140,145 1140,200" fill="url(#houseGradient)" />
          <polygon points="1065,145 1090,120 1115,145" fill="#0a2a4a" opacity="0.6" />
          <rect x="1065" y="165" width="18" height="22" fill="#0ea5e9" opacity="0.3" />
          <rect x="1097" y="165" width="18" height="22" fill="#0ea5e9" opacity="0.3" />
        </svg>

        {/* Ground gradient */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#0a1628]/80 to-transparent"></div>
      </div>
    </div>
  )
}

export default LoadingScreen
