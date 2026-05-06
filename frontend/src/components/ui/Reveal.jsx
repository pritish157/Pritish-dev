import { useEffect, useRef } from 'react'
import { motion, useAnimationControls, useInView, useReducedMotion } from 'framer-motion'

export default function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  y = 24,
  amount = 0.18,
  margin = '0px 0px -12% 0px',
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div
  const ref = useRef(null)
  const controls = useAnimationControls()
  const isInView = useInView(ref, { amount, margin, once })

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    if (isInView) {
      controls.start('visible')
      return
    }

    if (!once) {
      controls.start('hidden')
    }
  }, [controls, isInView, once, shouldReduceMotion])

  if (shouldReduceMotion) {
    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </Component>
  )
}
