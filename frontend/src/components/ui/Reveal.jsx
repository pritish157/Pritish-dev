import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  y = 18,
  amount = 0.2,
  margin = '0px 0px -10% 0px',
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  if (shouldReduceMotion) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </Component>
  )
}
