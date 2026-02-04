import { useState, useEffect } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-100px 0px -50% 0px'
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          window.history.replaceState(null, '', `#${entry.target.id}`)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      if (windowHeight + scrollTop >= documentHeight - 100) {
        setActiveSection('contact')
        window.history.replaceState(null, '', '#contact')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        scrollToSection(hash)
        setActiveSection(hash)
      }
    }

    if (window.location.hash) {
      const hash = window.location.hash.slice(1)
      setTimeout(() => scrollToSection(hash), 100)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  const skills = {
    designTools: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Premiere Pro', 'After Effects', 'Canva', 'Adobe Creative Suite'],
    expertise: ['UI/UX', 'Layout Design', 'Branding', 'Packaging Design', 'Digital Illustration', 'Visual Storytelling'],
    ai: ['Gemini', 'AI Design Tools']
  }

  const projects = [
    {
      title: 'Velvet Vines: A Heritage Wine Experience',
      description: 'Premium wine logo and label with minimalist, heritage-inspired aesthetics. Created scalable vector packaging elements for consistent branding.',
      link: 'https://drive.google.com/file/d/1Or4TwJZ8VtIU0EuMNu2DpYyLuGyaIusT/view?usp=sharing',
      tags: ['Branding', 'Packaging', 'Illustrator']
    },
    {
      title: 'Digital Painting',
      description: 'Advanced digital artwork using non-destructive workflows, custom brushes, blending modes, gradient maps, and texture techniques.',
      link: 'https://drive.google.com/file/d/1ahR5mbkC8UTQAR5NrmNCtO6Jpu23IBTo/view?usp=sharing',
      tags: ['Digital Art', 'Photoshop', 'Illustration']
    },
    {
      title: 'Juice Product Advertisement',
      description: 'Promotional video editing with smooth transitions, color grading, audio integration, and motion effects.',
      link: 'https://drive.google.com/file/d/1SWpd28cdh1aGC3zXCm-tgphZpdyv4GXT/view?usp=sharing',
      tags: ['Video Editing', 'Premiere Pro', 'Motion Graphics']
    },
    {
      title: 'Premium Tea Bag Packaging Design',
      description: 'Print-ready, vector-based packaging with custom illustrations, typography, and structured layouts.',
      link: 'https://drive.google.com/drive/folders/1G_ApfOWVsIPnGOrsUm_Acqtl43Xk0qTe?usp=sharing',
      tags: ['Packaging', 'Illustrator', 'Print Design']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#1a1a2e]/95 via-[#0f3460]/95 to-[#16213e]/95 border-b-2 border-primary/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo with Name */}
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl overflow-hidden border-3 border-transparent bg-gradient-to-br from-primary via-accent to-secondary p-[3px] shadow-xl shadow-primary/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-accent/70">
                <div className="h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-dark to-[#0f3460]">
                  <img src="shared_image.jpg" alt="Prerana Dipak" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Prerana Dipak
                </h3>
                <p className="text-xs md:text-sm text-secondary font-medium">Graphic Designer</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/5 backdrop-blur-sm rounded-2xl px-2 py-2 border border-white/10">
              {['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map(section => (
                <li key={section}>
                  <button 
                    onClick={() => scrollToSection(section)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 overflow-hidden group ${
                      activeSection === section 
                        ? 'text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {activeSection === section && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl animate-gradient-shift bg-200"></span>
                    )}
                    <span className="relative z-10 group-hover:scale-110 inline-block transition-transform duration-300">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </span>
                    {activeSection !== section && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <ul className="px-4 pb-4 space-y-2 bg-dark/95 backdrop-blur-md">
            {['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'].map(section => (
              <li key={section}>
                <button 
                  onClick={() => {
                    scrollToSection(section)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center pt-20 px-4 bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#16213e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold leading-tight animate-fade-in-down" style={{animationDelay: '0.1s'}}>
              Hi, I'm <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-shift bg-200">Prerana Dipak</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 animate-fade-in-left" style={{animationDelay: '0.3s'}}>Graphic Designer</h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
              Creating impactful, audience-focused designs that elevate brand identity through visual storytelling, branding, and digital media.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-sm sm:text-base text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70 hover:scale-105 transition-all duration-300"
              >
                View My Work
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="px-5 sm:px-8 py-3 sm:py-4 border-2 border-secondary/50 rounded-xl font-bold text-sm sm:text-base text-white backdrop-blur-sm hover:bg-secondary/10 hover:border-secondary transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
            <div className="flex gap-3 md:gap-4 pt-2 md:pt-4 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
              {[
                { href: 'mailto:preranadipak17@gmail.com', label: 'Email', d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6' },
                { href: 'https://linkedin.com/in/prerana-dipak', label: 'LinkedIn', fill: true, d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                { href: 'https://github.com/prerana-dipak', target: '_blank', label: 'GitHub', fill: true, d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                { href: 'https://instagram.com/prerana.dipak', target: '_blank', label: 'Instagram', fill: true, d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { href: '/Resume.pdf', download: 'Prerana_Dipak_Resume.pdf', label: 'Download Resume', isDownload: true, d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' }
              ].map((social, i) => (
                <a key={i} href={social.href} target={social.target || "_blank"} rel="noopener noreferrer" download={social.download} aria-label={social.label} className="p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill={social.fill ? 'currentColor' : 'none'} stroke={social.fill ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.d}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="relative h-72 sm:h-96 md:h-[600px] flex items-center justify-center">
            {/* Central Core */}
            <div className="absolute z-10 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary via-accent to-secondary animate-pulse-glow flex items-center justify-center shadow-[0_0_40px_rgba(255,107,107,0.6)] sm:shadow-[0_0_60px_rgba(255,107,107,0.6)]">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-dark flex items-center justify-center">
                <svg className="w-7 h-7 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>

            {/* Orbit Rings */}
            <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] rounded-full border-2 border-white/10 animate-rotate" style={{animationDuration: '30s'}}></div>
            <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] rounded-full border border-white/5 animate-rotate" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>

            {/* Orbiting Skill Icons */}
            {[
              { name: 'Photoshop', icon: 'Ps', color: '#31A8FF', bgColor: '#001E36' },
              { name: 'Illustrator', icon: 'Ai', color: '#FF9A00', bgColor: '#330000' },
              { name: 'InDesign', icon: 'Id', color: '#FF3366', bgColor: '#49021F' },
              { name: 'Figma', icon: 'F', color: '#F24E1E', bgColor: '#0D0D0D' },
              { name: 'Premiere Pro', icon: 'Pr', color: '#9999FF', bgColor: '#00005B' },
              { name: 'After Effects', icon: 'Ae', color: '#9999FF', bgColor: '#00005B' },
              { name: 'Canva', icon: 'C', color: '#00C4CC', bgColor: '#000000' },
              { name: 'UI/UX', icon: '✨', color: '#FFD700', bgColor: '#1a1a1a' },
              { name: 'Branding', icon: '🎨', color: '#FF6B6B', bgColor: '#1a1a1a' },
              { name: 'Video', icon: '🎬', color: '#4ECDC4', bgColor: '#1a1a1a' },
              { name: 'Digital Art', icon: '🖌️', color: '#95E1D3', bgColor: '#1a1a1a' },
              { name: 'AI Tools', icon: '🤖', color: '#A8E6CF', bgColor: '#1a1a1a' },
            ].map((skill, index) => {
              const orbitRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : (window.innerWidth < 768 ? 150 : 175);
              
              return (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 -ml-6 -mt-6 sm:-ml-7 sm:-mt-7 md:-ml-8 md:-mt-8"
                  style={{
                    animation: `orbit 20s linear infinite`,
                    animationDelay: `-${(20 / 12) * index}s`,
                    '--orbit-radius': `${orbitRadius}px`,
                  }}
                >
                  <div className="group cursor-pointer relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 scale-150" style={{backgroundColor: skill.color}}></div>
                    
                    {/* Adobe-Style Icon Container */}
                    <div 
                      className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-125 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl border-2 border-opacity-30 hover:border-opacity-60"
                      style={{
                        backgroundColor: skill.bgColor,
                        color: skill.color,
                        borderColor: skill.color,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: '800'
                      }}
                    >
                      <span className="relative z-10">{skill.icon}</span>
                      {/* Inner gradient overlay */}
                      <div className="absolute inset-0 rounded-2xl opacity-20" style={{background: `radial-gradient(circle at 30% 30%, ${skill.color}, transparent)`}}></div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-0 group-hover:opacity-100 group-hover:-bottom-12 transition-all duration-300 whitespace-nowrap pointer-events-none z-50">
                      <div className="px-3 py-1 rounded-lg text-white text-xs font-bold shadow-lg" style={{backgroundColor: skill.color}}>
                        {skill.name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 bg-[#0f0f23]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 uppercase tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-down">About Me</h2>
          <div className="grid md:grid-cols-[400px_1fr] gap-8 md:gap-12 items-start">
            <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] mx-auto animate-scale-in">
              <div className="absolute inset-[-20px] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(102,126,234,0.6),rgba(245,87,108,0.6),rgba(0,242,254,0.6),rgba(67,233,123,0.6),transparent)] animate-rotate-glow blur-[20px]"></div>
              <div className="absolute inset-[-5px] rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-40 blur-[15px] animate-pulse-glow"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_60px_rgba(102,126,234,0.3)] animate-float-image">
                <img src="shared_image.jpg" alt="Prerana Dipak - Graphic Designer" className="w-full h-full object-cover transition-transform duration-400 hover:scale-110" onError={(e) => e.target.style.display = 'none'} />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-white/80">
              <p className="animate-fade-in-right" style={{animationDelay: '0.2s'}}>
                I am Prerana Dipak, a passionate graphic designer with a fresh creative perspective and a master's degree in graphic design. I specialize in visual storytelling, branding, packaging, and digital media design, with a strong eye for detail and aesthetics.
              </p>
              <p className="animate-fade-in-right" style={{animationDelay: '0.4s'}}>
                Proficient in Adobe Creative Suite, Figma, and video editing tools, I aim to create impactful, audience-focused designs that elevate brand identity and deliver memorable visual experiences.
              </p>
              <p className="font-semibold text-white animate-fade-in-right" style={{animationDelay: '0.6s'}}>
                <strong>Languages:</strong> English, Hindi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 uppercase tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-down">Skills & Expertise</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Design Tools', icon: '🛠️', items: skills.designTools },
              { title: 'Design Expertise', icon: '💡', items: skills.expertise },
              { title: 'AI & Innovation', icon: '🤖', items: skills.ai }
            ].map((category, idx) => (
              <div key={idx} className="relative animate-fade-in-up" style={{animationDelay: `${idx * 0.2}s`}}>
                {idx < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-0.5 h-24 bg-gradient-to-b from-primary via-secondary to-accent"></div>}
                {idx < 2 && <div className="hidden md:block absolute top-1/2 -right-5 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse-glow shadow-[0_0_20px_rgba(102,126,234,0.8)]"></div>}
                
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(102,126,234,0.3)] transition-all duration-500 h-full group">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill, i) => (
                      <span key={i} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 text-sm font-medium hover:from-primary/30 hover:to-secondary/30 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 bg-[#0f0f23]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 uppercase tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-down">Work Experience</h2>
          <div className="relative pl-8 border-l-2 border-white/10 animate-fade-in-left">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_rgba(102,126,234,0.8)] animate-glow-pulse"></div>
            
            <div className="pb-8 animate-fade-in-right" style={{animationDelay: '0.2s'}}>
              <div className="text-xs sm:text-sm font-semibold text-accent mb-2">June 2024 – March 2025</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Graphic Designer Intern</h3>
              <h4 className="text-base sm:text-lg text-white/70 mb-4">The Vaishnavi Deoghar</h4>
              <ul className="space-y-2 text-sm sm:text-base text-white/80">
                <li className="flex gap-2"><span className="text-primary">•</span> Completed a creative internship from July 2024 to March 2025</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Designed branding visuals for festive seasons and holiday campaigns</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Created culturally inspired packaging designs for festival-related products</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Developed social media creatives, banners, and promotional content</li>
                <li className="flex gap-2"><span className="text-primary">•</span> Collaborated with design and marketing teams to ensure brand consistency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 uppercase tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-down">Featured Projects</h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.15}s` }} className="p-5 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(102,126,234,0.4)] hover:-translate-y-2 transition-all duration-500 animate-fade-in-up group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:rotate-12 hover:scale-110 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 bg-[#0f0f23]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 uppercase tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-down">Education</h2>
          <div className="p-5 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(102,126,234,0.3)] transition-all duration-500 animate-scale-in">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">MBA in Graphic Design</h3>
            <h4 className="text-lg sm:text-xl text-white/80 mb-4">International School of Design, Pune</h4>
            <div className="flex flex-wrap gap-4 text-white/70">
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                May 2022 – June 2024
              </span>
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                CGPA: 8.11
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 md:mb-16 uppercase tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in-down">Let's Work Together</h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              { icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6', title: 'Email Me', value: 'preranadipak17@gmail.com', href: 'mailto:preranadipak17@gmail.com', sub: "I'll respond within 24 hours" },
              { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', title: 'Call Me', value: '+91 7979959056', href: 'tel:7979959056', sub: 'Mon-Fri, 9AM-6PM IST' },
              { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', title: 'Visit Me', value: 'Pune, India', sub: 'Open for local meetings' }
            ].map((contact, i) => (
              <div key={i} style={{animationDelay: `${i * 0.15}s`}} className="p-5 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(102,126,234,0.3)] hover:-translate-y-2 transition-all duration-500 text-center animate-fade-in-up group">
                <div className="inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <svg width="24" height="24" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={contact.icon}/>
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-bold mb-2">{contact.title}</h4>
                {contact.href ? (
                  <a href={contact.href} className="text-sm sm:text-base text-white/90 hover:text-primary transition-colors">{contact.value}</a>
                ) : (
                  <div className="text-sm sm:text-base text-white/90">{contact.value}</div>
                )}
                <p className="text-xs sm:text-sm text-white/60 mt-2">{contact.sub}</p>
              </div>
            ))}
          </div>

          <div className="text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <a href="mailto:preranadipak17@gmail.com" className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-base sm:text-lg text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:shadow-[0_0_50px_rgba(102,126,234,0.6)] hover:scale-110 transition-all duration-500 animate-glow-pulse group">
              <span>Start a Project</span>
              <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 bg-[#0f0f23] border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/60">
          <p className="text-xs sm:text-sm md:text-base">&copy; 2026 Prerana Dipak. Crafted with passion and creativity.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
