import { useState, useEffect } from 'react'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [sunPosition, setSunPosition] = useState(0) // 0 to 100

  useEffect(() => {
    // Sun animation - rises and sets in 4 seconds
    const sunInterval = setInterval(() => {
      setSunPosition(prev => {
        if (prev >= 100) {
          clearInterval(sunInterval)
          // When sun sets, trigger page load after brief delay
          setTimeout(() => {
            onLoadingComplete()
          }, 300)
          return 100
        }
        return prev + 2.5 // 100 / 40 frames = 2.5 per frame for 4 seconds
      })
    }, 100)

    // Progress bar sync with sun
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2.5, 100))
    }, 100)

    return () => {
      clearInterval(sunInterval)
      clearInterval(progressInterval)
    }
  }, [onLoadingComplete])

  // Calculate sun horizontal position (rises from left, sets to right)
  const getSunX = () => {
    // 0% to 100% - moves from left to right
    return sunPosition
  }

  // Calculate sun vertical position (arc motion)
  const getSunY = () => {
    // Create an arc: starts high, peaks at middle, ends high
    // Using parabola: y = -4(x-0.5)^2 + 1
    const normalizedPos = sunPosition / 100
    const height = -4 * Math.pow(normalizedPos - 0.5, 2) + 1
    // Map to screen position: mobile (55% to 20%), desktop (60% to 15%)
    const isMobile = window.innerWidth < 640
    const bottom = isMobile ? 55 : 60
    const range = isMobile ? 35 : 45
    return bottom - (height * range)
  }

  // Sky color changes based on sun position with smooth transitions
  const getSkyGradient = () => {
    if (sunPosition < 10) {
      // Deep night
      return 'from-[#0f172a] via-[#1e293b] to-[#1e293b]'
    } else if (sunPosition < 20) {
      // Early dawn
      return 'from-[#1e293b] via-[#334155] to-[#475569]'
    } else if (sunPosition < 30) {
      // Dawn breaking
      return 'from-[#475569] via-[#64748b] to-[#f97316]/50'
    } else if (sunPosition < 40) {
      // Sunrise colors appearing
      return 'from-[#fbbf24]/60 via-[#f97316] to-[#fb923c]'
    } else if (sunPosition < 50) {
      // Full sunrise - bright warm
      return 'from-[#fcd34d] via-[#fb923c] to-[#38bdf8]'
    } else if (sunPosition < 60) {
      // Peak day - bright
      return 'from-[#38bdf8] via-[#fb923c] to-[#fcd34d]'
    } else if (sunPosition < 70) {
      // Evening beginning
      return 'from-[#fb923c] via-[#f97316] to-[#fbbf24]/60'
    } else if (sunPosition < 80) {
      // Sunset colors
      return 'from-[#f97316]/50 via-[#64748b] to-[#475569]'
    } else if (sunPosition < 90) {
      // Dusk
      return 'from-[#475569] via-[#334155] to-[#1e293b]'
    } else {
      // Night returns
      return 'from-[#1e293b] via-[#1e293b] to-[#0f172a]'
    }
  }

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-b ${getSkyGradient()} overflow-hidden transition-all duration-1000 ease-in-out`}>
      {/* Stars/particles in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 2 + 1
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-20 sm:opacity-30 md:opacity-40 animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 70}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          )
        })}
      </div>

      {/* Animated Sun - moves from left to right */}
      <div 
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear z-10"
        style={{
          left: `${getSunX()}%`,
          top: `${getSunY()}%`,
        }}
      >
        {/* Sun glow */}
        <div className="absolute inset-0 -m-6 sm:-m-10 md:-m-14 lg:-m-16">
          <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-[30px] sm:blur-[50px] md:blur-[60px]"></div>
          <div className="absolute inset-1 sm:inset-2 rounded-full bg-orange-400/30 blur-[20px] sm:blur-[35px] md:blur-[40px]"></div>
        </div>
        
        {/* Sun circle */}
        <div className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-xl sm:shadow-2xl shadow-orange-500/50">
          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 sm:w-1 h-6 sm:h-10 md:h-14 lg:h-16 bg-gradient-to-t from-yellow-300/80 to-transparent origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
              }}
            ></div>
          ))}
          {/* Sun shine */}
          <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-br from-yellow-200/60 to-transparent"></div>
        </div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Loading text */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12 z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white/90 tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] drop-shadow-lg">
            LOADING
          </h1>
        </div>

        {/* Percentage */}
        <div className="text-center z-10">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white/80 tabular-nums drop-shadow-lg">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>

      {/* Bottom landscape silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 pointer-events-none z-20">
        {/* Houses silhouette */}
        <svg className="absolute bottom-0 w-full h-full opacity-50 sm:opacity-55 md:opacity-60" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="houseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a2a4a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1a3a5a" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* House 1 */}
          <polygon points="30,200 30,130 70,100 110,130 110,200" fill="url(#houseGradient)" />
          <polygon points="50,130 70,110 90,130" fill="#0a2a4a" opacity="0.7" />
          <rect x="45" y="155" width="12" height="16" fill="#fbbf24" opacity="0.4" />
          <rect x="73" y="155" width="12" height="16" fill="#fbbf24" opacity="0.4" />
          
          {/* House 2 - Tall */}
          <polygon points="120,200 120,110 160,75 200,110 200,200" fill="url(#houseGradient)" />
          <polygon points="140,110 160,85 180,110" fill="#0a2a4a" opacity="0.7" />
          <rect x="140" y="135" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          <rect x="166" y="135" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          <rect x="140" y="165" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          <rect x="166" y="165" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          
          {/* House 3 - Small */}
          <polygon points="210,200 210,155 240,135 270,155 270,200" fill="url(#houseGradient)" />
          <polygon points="225,155 240,140 255,155" fill="#0a2a4a" opacity="0.7" />
          <rect x="228" y="170" width="10" height="13" fill="#fbbf24" opacity="0.3" />
          
          {/* House 4 */}
          <polygon points="280,200 280,125 325,90 370,125 370,200" fill="url(#houseGradient)" />
          <polygon points="303,125 325,100 347,125" fill="#0a2a4a" opacity="0.7" />
          <rect x="300" y="150" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="335" y="150" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          
          {/* House 5 - Medium */}
          <polygon points="385,200 385,140 420,115 455,140 455,200" fill="url(#houseGradient)" />
          <polygon points="402,140 420,120 438,140" fill="#0a2a4a" opacity="0.7" />
          <rect x="405" y="160" width="13" height="17" fill="#fbbf24" opacity="0.4" />
          
          {/* House 6 - Small */}
          <polygon points="465,200 465,165 490,145 515,165 515,200" fill="url(#houseGradient)" />
          <polygon points="477,165 490,150 503,165" fill="#0a2a4a" opacity="0.7" />
          <rect x="480" y="175" width="9" height="12" fill="#fbbf24" opacity="0.3" />
          
          {/* House 7 */}
          <polygon points="525,200 525,135 565,105 605,135 605,200" fill="url(#houseGradient)" />
          <polygon points="545,135 565,115 585,135" fill="#0a2a4a" opacity="0.7" />
          <rect x="545" y="155" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          <rect x="571" y="155" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          
          {/* House 8 - Tall */}
          <polygon points="615,200 615,105 660,65 705,105 705,200" fill="url(#houseGradient)" />
          <polygon points="637,105 660,80 683,105" fill="#0a2a4a" opacity="0.7" />
          <rect x="640" y="125" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="665" y="125" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="640" y="155" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="665" y="155" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          
          {/* House 9 - Medium */}
          <polygon points="715,200 715,145 750,120 785,145 785,200" fill="url(#houseGradient)" />
          <polygon points="732,145 750,125 768,145" fill="#0a2a4a" opacity="0.7" />
          <rect x="735" y="165" width="12" height="16" fill="#fbbf24" opacity="0.4" />
          <rect x="753" y="165" width="12" height="16" fill="#fbbf24" opacity="0.4" />
          
          {/* House 10 - Small */}
          <polygon points="795,200 795,160 820,140 845,160 845,200" fill="url(#houseGradient)" />
          <polygon points="807,160 820,145 833,160" fill="#0a2a4a" opacity="0.7" />
          
          {/* House 11 */}
          <polygon points="855,200 855,130 895,100 935,130 935,200" fill="url(#houseGradient)" />
          <polygon points="875,130 895,110 915,130" fill="#0a2a4a" opacity="0.7" />
          <rect x="875" y="150" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          <rect x="901" y="150" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          
          {/* House 12 - Medium */}
          <polygon points="945,200 945,140 980,115 1015,140 1015,200" fill="url(#houseGradient)" />
          <polygon points="962,140 980,120 998,140" fill="#0a2a4a" opacity="0.7" />
          <rect x="965" y="160" width="13" height="17" fill="#fbbf24" opacity="0.4" />
          
          {/* House 13 - Tall */}
          <polygon points="1025,200 1025,110 1070,75 1115,110 1115,200" fill="url(#houseGradient)" />
          <polygon points="1047,110 1070,85 1093,110" fill="#0a2a4a" opacity="0.7" />
          <rect x="1050" y="130" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="1075" y="130" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="1050" y="160" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="1075" y="160" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          
          {/* House 14 */}
          <polygon points="1125,200 1125,135 1165,105 1205,135 1205,200" fill="url(#houseGradient)" />
          <polygon points="1145,135 1165,115 1185,135" fill="#0a2a4a" opacity="0.7" />
          <rect x="1148" y="155" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          <rect x="1173" y="155" width="14" height="18" fill="#fbbf24" opacity="0.4" />
          
          {/* House 15 - Small */}
          <polygon points="1215,200 1215,160 1245,140 1275,160 1275,200" fill="url(#houseGradient)" />
          <polygon points="1230,160 1245,145 1260,160" fill="#0a2a4a" opacity="0.7" />
          <rect x="1235" y="175" width="10" height="13" fill="#fbbf24" opacity="0.3" />
          
          {/* House 16 */}
          <polygon points="1285,200 1285,125 1330,90 1375,125 1375,200" fill="url(#houseGradient)" />
          <polygon points="1308,125 1330,100 1352,125" fill="#0a2a4a" opacity="0.7" />
          <rect x="1310" y="150" width="15" height="20" fill="#fbbf24" opacity="0.4" />
          <rect x="1335" y="150" width="15" height="20" fill="#fbbf24" opacity="0.4" />
        </svg>

        {/* Ground gradient */}
        <div className="absolute bottom-0 w-full h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#0a1628]/95 to-transparent"></div>
      </div>
    </div>
  )
}

export default LoadingScreen
