import { useState, useEffect } from 'react'
import profileImage from './asset/image.jpeg'
import resumePDF from './asset/Prerana_Dipak_Resuma.pdf'

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
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo with Name */}
            <div className="flex items-center gap-3 md:gap-4 group">
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl overflow-hidden border-3 border-transparent bg-gradient-to-br from-primary via-accent to-secondary p-[3px] shadow-xl shadow-primary/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-accent/70">
                <div className="h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-dark to-[#0f3460]">
                  <img src={profileImage} alt="Prerana Dipak" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="block">
                <h3 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
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
              className="md:hidden relative z-50 p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-primary/50 active:scale-95 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span 
                  className={`block h-0.5 w-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span 
                  className={`block h-0.5 w-full bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span 
                  className={`block h-0.5 w-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
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
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 md:pt-24 pb-8 md:pb-0 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a0a2e] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-fade-in-down" style={{animationDelay: '0.1s'}}>
              Hi, I'm <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-shift bg-200">Prerana Dipak</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 animate-fade-in-left" style={{animationDelay: '0.3s'}}>Graphic Designer</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed">
              Creating impactful, audience-focused designs that elevate brand identity through visual storytelling, branding, and digital media.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-sm sm:text-base text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70 hover:scale-105 transition-all duration-300"
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
                { href: resumePDF, download: 'Prerana_Dipak_Resume.pdf', label: 'Download Resume', isDownload: true, d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' }
              ].map((social, i) => (
                <a key={i} href={social.href} target={social.target || "_blank"} rel="noopener noreferrer" download={social.download} aria-label={social.label} className="p-2 sm:p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:border-primary/50 hover:scale-110 transition-all duration-300">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill={social.fill ? 'currentColor' : 'none'} stroke={social.fill ? 'none' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.d}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px] flex items-center justify-center mt-8 md:mt-0">
            {/* Central Core */}
            <div className="absolute z-10 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary via-accent to-secondary animate-pulse-glow flex items-center justify-center shadow-[0_0_30px_rgba(255,107,107,0.6)] sm:shadow-[0_0_60px_rgba(255,107,107,0.6)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-dark flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>

            {/* Orbit Rings */}
            <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-full border-2 border-white/10 animate-rotate" style={{animationDuration: '30s'}}></div>
            <div className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full border border-white/5 animate-rotate" style={{animationDuration: '25s', animationDirection: 'reverse'}}></div>

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
              const orbitRadius = typeof window !== 'undefined' && window.innerWidth < 480 ? 100 : (window.innerWidth < 640 ? 120 : (window.innerWidth < 768 ? 150 : 175));
              
              return (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 -ml-5 -mt-5 sm:-ml-6 sm:-mt-6 md:-ml-7 md:-mt-7 lg:-ml-8 lg:-mt-8"
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
                      className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-125 flex items-center justify-center font-bold text-base sm:text-lg md:text-xl lg:text-2xl border-2 border-opacity-30 hover:border-opacity-60"
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
      <section id="about" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0f0f23] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 animate-bounce">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-sm font-semibold uppercase tracking-wider">
                Get to know me
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image Section with 3D Effect */}
            <div className="relative group perspective-1000">
              <div className="relative w-full max-w-md mx-auto">
                {/* Floating particles */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
                
                {/* Main Image Container */}
                <div className="relative transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/20">
                    <img 
                      src={profileImage} 
                      alt="Prerana Dipak - Graphic Designer" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-primary/60 rounded-tl-2xl"></div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-accent/60 rounded-br-2xl"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                <p className="relative pl-6 border-l-4 border-primary/40 animate-fade-in-right hover:border-primary transition-colors">
                  I am <span className="text-white font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Prerana Dipak</span>, a passionate graphic designer with a fresh creative perspective and a master's degree in graphic design. I specialize in <span className="text-accent">visual storytelling</span>, <span className="text-primary">branding</span>, <span className="text-secondary">packaging</span>, and digital media design.
                </p>
                <p className="relative pl-6 border-l-4 border-accent/40 animate-fade-in-right hover:border-accent transition-colors" style={{animationDelay: '0.2s'}}>
                  Proficient in <span className="text-accent font-semibold">Adobe Creative Suite</span>, <span className="text-primary font-semibold">Figma</span>, and video editing tools, I aim to create impactful, audience-focused designs that elevate brand identity and deliver memorable visual experiences.
                </p>
              </div>

              {/* Stats/Info Cards */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/60 transition-all transform hover:scale-105">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">MBA</div>
                  <div className="text-sm text-gray-400">Graphic Design</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 hover:border-accent/60 transition-all transform hover:scale-105">
                  <div className="text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-2">10</div>
                  <div className="text-sm text-gray-400">Months Experience</div>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Languages</div>
                  <div className="text-lg font-semibold text-white">English • Hindi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a0a2e] to-[#0a0a1a] relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(102,126,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(102,126,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-6 animate-bounce">
              <span className="px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 text-accent text-sm font-semibold uppercase tracking-wider shadow-lg">
                What I Bring to the Table
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Design Tools', icon: '🛠️', items: skills.designTools, gradient: 'from-blue-500/10 via-cyan-500/10 to-blue-500/10', borderColor: 'border-blue-500/20', hoverBorder: 'hover:border-blue-500/60' },
              { title: 'Design Expertise', icon: '💡', items: skills.expertise, gradient: 'from-amber-500/10 via-orange-500/10 to-amber-500/10', borderColor: 'border-amber-500/20', hoverBorder: 'hover:border-amber-500/60' },
              { title: 'AI & Innovation', icon: '🤖', items: skills.ai, gradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/10', borderColor: 'border-purple-500/20', hoverBorder: 'hover:border-purple-500/60' }
            ].map((category, idx) => (
              <div 
                key={idx} 
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${category.gradient} backdrop-blur-sm border ${category.borderColor} ${category.hoverBorder} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up overflow-hidden`}
                style={{animationDelay: `${idx * 0.15}s`}}
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Glowing corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon with animation */}
                  <div className="text-5xl mb-6 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 inline-block">
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-500">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-3">
                    {category.items.map((skill, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:translate-x-2 group/item"
                        style={{animationDelay: `${(idx * 0.1) + (i * 0.05)}s`}}
                      >
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent group-hover/item:w-3 group-hover/item:h-3 transition-all duration-300"></div>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress indicator line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Additional skill highlights */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap justify-center gap-3 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              {['Creative Problem Solving', 'Brand Strategy', 'Print & Digital', 'Motion Graphics', 'User-Centric Design'].map((skill, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-sm font-medium hover:scale-110 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-default"
                  style={{animationDelay: `${i * 0.1}s`}}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0f0f23] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(102,126,234,0.05),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 animate-bounce">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary text-sm font-semibold uppercase tracking-wider">
                My Journey
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Work Experience
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Experience Content */}
            <div className="space-y-8 animate-fade-in-left">
              <div className="mb-4">
                <div className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 text-primary text-sm font-semibold">
                  June 2024 – March 2025
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Graphic Designer Intern</h3>
                    <h4 className="text-base sm:text-lg md:text-xl text-accent font-semibold">The Vaishnavi Deoghar</h4>
                  </div>
                </div>
                
                <ul className="space-y-4 text-gray-300">
                  {[
                    'Designed branding visuals for festive seasons and campaigns',
                    'Created culturally inspired packaging designs',
                    'Developed social media creatives and promotional content',
                    'Ensured brand consistency across all platforms'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 hover:text-white transition-colors group">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2 group-hover:w-3 group-hover:h-3 transition-all"></span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side - Animated Illustration */}
            <div className="relative animate-fade-in-right hidden md:block">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated background circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main illustration container */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden">
                  {/* Floating design elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 animate-float"></div>
                  <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 left-10 w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-primary opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                  
                  {/* Center graphic design icon */}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 animate-bounce-slow">
                      <svg className="w-48 h-48 mx-auto text-primary/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>
                      </svg>
                    </div>
                    
                    {/* Rotating text badges */}
                    <div className="flex flex-col gap-3">
                      {['Creative Design', 'Brand Identity', 'Visual Strategy'].map((text, i) => (
                        <div 
                          key={i}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-sm font-semibold animate-fade-in-up"
                          style={{animationDelay: `${i * 0.2}s`}}
                        >
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decorative grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(102,126,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(102,126,234,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a0a2e] to-[#0a0a1a] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,87,108,0.05),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="max-w-7xl mx-auto relative z-10 px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 animate-bounce">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 text-accent text-sm font-semibold uppercase tracking-wider">
                Academic Background
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-accent via-secondary to-primary mx-auto rounded-full"></div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Education Content */}
            <div className="space-y-8 animate-fade-in-left">
              <div className="mb-4">
                <div className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/40 text-accent text-sm font-semibold">
                  May 2022 – June 2024
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">MBA in Graphic Design</h3>
                    <h4 className="text-base sm:text-lg md:text-xl text-accent font-semibold">International School of Design, Pune</h4>
                  </div>
                </div>

                {/* CGPA Badge */}
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1 font-medium">Academic Performance</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                      CGPA: 8.11
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Animated Illustration */}
            <div className="relative animate-fade-in-right hidden md:block">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated background circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Main illustration container */}
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-accent/10 via-secondary/5 to-transparent border border-accent/20 backdrop-blur-sm p-8 flex items-center justify-center overflow-hidden">
                  {/* Floating design elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary opacity-20 animate-float"></div>
                  <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 left-10 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                  
                  {/* Center academic icon */}
                  <div className="relative z-10 text-center">
                    <div className="mb-6 animate-bounce-slow">
                      <svg className="w-48 h-48 mx-auto text-accent/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
                      </svg>
                    </div>
                    
                    {/* Education text badges */}
                    <div className="flex flex-col gap-3">
                      {['Design Excellence', 'Academic Achievement', 'Creative Learning'].map((text, i) => (
                        <div 
                          key={i}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-secondary/20 border border-accent/30 text-accent text-sm font-semibold animate-fade-in-up"
                          style={{animationDelay: `${i * 0.2}s`}}
                        >
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Decorative grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(245,87,108,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,87,108,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-[#0f0f23] via-[#1a0a2e] to-[#0a0a1a] relative overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(102,126,234,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(245,87,108,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 animate-bounce">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/30 text-secondary text-sm font-semibold uppercase tracking-wider">
                Portfolio Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group relative rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                {/* Main card */}
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  {/* Decorative corner gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-500">
                        {project.title}
                      </h3>
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-shrink-0 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-primary/20 hover:to-accent/20 hover:border-primary/50 hover:rotate-45 hover:scale-110 transition-all duration-300 group/link"
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover/link:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-white/10 text-sm font-medium text-gray-300 hover:from-primary/20 hover:to-accent/20 hover:border-primary/30 hover:text-white hover:scale-110 transition-all duration-300 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* View more button */}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 hover:from-primary/20 hover:to-accent/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 group">
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                View All Projects
              </span>
              <svg className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0f0f23] relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 animate-bounce">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-sm font-semibold uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              { 
                icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6', 
                title: 'Email', 
                value: 'preranadipak17@gmail.com', 
                href: 'mailto:preranadipak17@gmail.com', 
                subtitle: "I'll respond within 24 hours",
                gradient: 'from-blue-500/10 to-cyan-500/10',
                iconColor: 'text-blue-400'
              },
              { 
                icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', 
                title: 'Phone', 
                value: '+91 7979959056', 
                href: 'tel:7979959056', 
                subtitle: 'Mon-Fri, 9AM-6PM IST',
                gradient: 'from-purple-500/10 to-pink-500/10',
                iconColor: 'text-purple-400'
              },
              { 
                icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 
                title: 'Location', 
                value: 'Pune, India', 
                href: null, 
                subtitle: 'Open for opportunities',
                gradient: 'from-amber-500/10 to-orange-500/10',
                iconColor: 'text-amber-400'
              }
            ].map((contact, i) => (
              <div 
                key={i} 
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${contact.gradient} backdrop-blur-sm border border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 text-center animate-fade-in-up overflow-hidden`}
                style={{animationDelay: `${i * 0.1}s`}}
              >
                {/* Glowing orb on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-5 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ${contact.iconColor}`}>
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={contact.icon}/>
                    </svg>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3 text-white">{contact.title}</h4>
                  
                  {contact.href ? (
                    <a 
                      href={contact.href} 
                      className="block text-base text-gray-300 hover:text-white transition-colors mb-2 break-all font-medium"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <div className="text-base text-gray-300 mb-2 font-medium">{contact.value}</div>
                  )}
                  
                  <p className="text-sm text-gray-500">{contact.subtitle}</p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <div className="inline-block relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur-xl opacity-50 group-hover:opacity-100 animate-pulse"></div>
              
              <a 
                href="mailto:preranadipak17@gmail.com" 
                className="relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl font-bold text-base sm:text-lg md:text-xl text-white shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-500 group overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative z-10">Start a Project</span>
                <svg className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-4 mt-8">
              {[
                { href: 'https://linkedin.com/in/prerana-dipak', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', label: 'LinkedIn' },
                { href: 'https://github.com/prerana-dipak', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', label: 'GitHub' },
                { href: 'https://instagram.com/prerana.dipak', icon: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2z', label: 'Instagram' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-br hover:from-primary/20 hover:to-accent/20 hover:border-primary/50 hover:scale-125 hover:rotate-12 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.icon}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 bg-gradient-to-r from-[#0f0f23] via-[#1a0a2e] to-[#0a1628] border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto text-center text-white/60">
          <p className="text-xs sm:text-sm md:text-base">&copy; 2026 Prerana Dipak. Crafted with passion and creativity.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
