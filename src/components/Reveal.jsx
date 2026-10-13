import { motion, useReducedMotion } from 'framer-motion'

// Lightweight in-view reveal. Falls back to a no-op for reduced-motion users.
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 24,
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[Tag] || motion.div

  if (reduce) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
