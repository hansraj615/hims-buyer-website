import { motion } from 'framer-motion'

export function HeroDevices() {
  return (
    <div className="hero-devices" aria-hidden="true">
      <motion.div
        className="device-desktop"
        initial={{ opacity: 0, y: 48, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="device-desktop-bezel">
          <div className="device-desktop-chrome">
            <span />
            <span />
            <span />
            <div className="device-desktop-url">app.hims.hospital / dashboard</div>
          </div>
          <div className="device-desktop-screen">
            <img alt="" src="/screenshots/dashboard.jpg" />
          </div>
        </div>
        <div className="device-desktop-base" />
      </motion.div>

      <motion.div
        className="device-mobile"
        initial={{ opacity: 0, y: 64, x: 24 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="device-mobile-notch" />
        <div className="device-mobile-screen">
          <img alt="" src="/screenshots/pharmacy.jpg" />
        </div>
      </motion.div>
    </div>
  )
}
