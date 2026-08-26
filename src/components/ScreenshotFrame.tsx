import { motion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  delay?: number
}

export function ScreenshotFrame({ src, alt, delay = 0 }: Props) {
  return (
    <motion.div
      className="shot-frame"
      initial={{ opacity: 0, y: 28, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{ transformPerspective: 900 }}
    >
      <img alt={alt} loading="lazy" src={src} />
    </motion.div>
  )
}
