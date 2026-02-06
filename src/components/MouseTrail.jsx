import { useEffect, useState } from 'react'

function MouseTrail() {
  const [trails, setTrails] = useState([])

  useEffect(() => {
    let animationFrameId
    let lastTime = 0
    const throttleDelay = 20 // Add trail every 20ms for smoother effect

    const handleMouseMove = (e) => {
      const currentTime = Date.now()
      
      if (currentTime - lastTime < throttleDelay) {
        return
      }
      
      lastTime = currentTime

      const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        'linear-gradient(135deg, #f77062 0%, #fe5196 100%)'
      ]

      const colors = [
        '#FF1744', '#00E676', '#651FFF', '#FFD600',
        '#00B8D4', '#FF4081', '#76FF03', '#FF3D00'
      ]
      
      const particleTypes = ['circle', 'spark', 'star']
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)]
      
      // Create multiple particles per mouse move for richer effect
      const particleCount = Math.random() > 0.7 ? 2 : 1
      
      for (let i = 0; i < particleCount; i++) {
        const newTrail = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          gradient: gradients[Math.floor(Math.random() * gradients.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 15 + 8,
          type: type,
          rotation: Math.random() * 360,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          }
        }

        setTrails(prev => [...prev, newTrail])

        // Remove trail after animation
        setTimeout(() => {
          setTrails(prev => prev.filter(trail => trail.id !== newTrail.id))
        }, 1500)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const getParticleStyle = (trail) => {
    const baseStyle = {
      position: 'absolute',
      left: trail.x - trail.size / 2,
      top: trail.y - trail.size / 2,
      width: trail.size,
      height: trail.size,
      pointerEvents: 'none',
      animation: 'trailFloat 1.5s ease-out forwards'
    }

    if (trail.type === 'circle') {
      return {
        ...baseStyle,
        borderRadius: '50%',
        background: trail.gradient,
        boxShadow: `0 0 ${trail.size * 3}px ${trail.color}, 0 0 ${trail.size * 5}px ${trail.color}40`,
      }
    } else if (trail.type === 'spark') {
      return {
        ...baseStyle,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${trail.color} 0%, transparent 70%)`,
        boxShadow: `0 0 ${trail.size * 4}px ${trail.color}`,
        filter: 'blur(1px)'
      }
    } else if (trail.type === 'star') {
      return {
        ...baseStyle,
        background: trail.gradient,
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        boxShadow: `0 0 ${trail.size * 2}px ${trail.color}`,
        transform: `rotate(${trail.rotation}deg)`
      }
    }
  }

  return (
    <div className="mouse-trail-container" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: 'screen'
    }}>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="trail-particle"
          style={getParticleStyle(trail)}
        />
      ))}
    </div>
  )
}

export default MouseTrail
