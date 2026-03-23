import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const loaderRef = useRef(null)
  const vRef = useRef(null)
  const barRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
      }
    })

    // Animate bar fill
    tl.to(barRef.current, {
      width: '100%',
      duration: 1.6,
      ease: 'power2.inOut',
    }, 0)

    // V animation
    tl.fromTo(vRef.current,
      { scale: 0.7, opacity: 0, rotationY: 90 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 0.8, ease: 'back.out(1.5)' },
      0
    )

    tl.to(vRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    }, 1.2)

    // Exit
    tl.to(loaderRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power4.inOut',
    }, 2)
    tl.to(vRef.current, {
      scale: 14,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.in',
    }, 2)

    return () => tl.kill()
  }, [])

  if (done) return null

  return (
    <div ref={loaderRef} className="loader" style={{ clipPath: 'inset(0 0 0% 0)' }}>
      <div ref={vRef} className="loader-v">V</div>
      <div ref={barRef} className="loader-bar" />
    </div>
  )
}
