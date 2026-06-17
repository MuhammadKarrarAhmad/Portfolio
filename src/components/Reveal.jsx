import { motion } from 'framer-motion'
import { reveal, staggerContainer, staggerItem } from '../utils/animations'

export function Reveal({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({ children, stagger = 0.09, delay = 0, className = '' }) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', style = {} }) {
  return (
    <motion.div variants={staggerItem} className={className} style={style}>
      {children}
    </motion.div>
  )
}
