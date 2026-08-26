import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Phase = 'idle' | 'aim' | 'press' | 'open' | 'hold'

const sequence: Array<{ phase: Phase; ms: number }> = [
  { phase: 'idle', ms: 1200 },
  { phase: 'aim', ms: 1400 },
  { phase: 'press', ms: 500 },
  { phase: 'open', ms: 2800 },
  { phase: 'hold', ms: 2200 },
]

export function DoctorDemo() {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (reduceMotion) {
      setPhase('open')
      return
    }

    let index = 0
    let timer = 0

    const tick = () => {
      const step = sequence[index]
      setPhase(step.phase)
      timer = window.setTimeout(() => {
        index = (index + 1) % sequence.length
        tick()
      }, step.ms)
    }

    tick()
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  const menuOpen = phase === 'open' || phase === 'hold'
  const pressing = phase === 'press'

  return (
    <section className="doctor-demo section" id="live">
      <div className="shell doctor-demo-head">
        <p className="section-kicker">In the consulting room</p>
        <h2 className="section-title">Watch a consult begin.</h2>
        <p className="section-lead">
          A doctor sits down, opens the queue, and starts the consultation — the clinical workspace unfolds without leaving the patient context.
        </p>
      </div>

      <div className="shell doctor-stage">
        <div className="doctor-scene">
          <img alt="Doctor at a clinic desk reviewing HIMS on a laptop" className="doctor-photo" src="/screenshots/doctor-desk.jpg" />
          <div className="doctor-scrim" />

          <motion.div
            className="laptop-ui"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="laptop-ui-top">
              <strong>OPD Queue</strong>
              <span>Token 12 · Anita Rao</span>
            </div>

            <div className="laptop-ui-body">
              <div className="queue-row">
                <span className="token">T-11</span>
                <span>Ramesh K.</span>
                <span className="muted">Waiting</span>
              </div>
              <div className={`queue-row is-focus${pressing ? ' is-pressed' : ''}`}>
                <span className="token">T-12</span>
                <span>Anita Rao</span>
                <button className="start-btn" type="button">
                  Start consultation
                </button>
              </div>
              <div className="queue-row">
                <span className="token">T-13</span>
                <span>Sneha P.</span>
                <span className="muted">Called</span>
              </div>
            </div>

            <AnimatePresence>
              {menuOpen ? (
                <motion.aside
                  className="consult-drawer"
                  initial={{ x: '108%', opacity: 0.4 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '108%', opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="drawer-kicker">Consultation</p>
                  <h3>Anita Rao</h3>
                  <p className="drawer-meta">UHID DEMOHIMS-000012 · OPD · Dr. Mehta</p>
                  <ul>
                    <li>Chief complaint</li>
                    <li>Vitals & notes</li>
                    <li>Prescription</li>
                    <li>Body map</li>
                    <li>Diagnostics</li>
                  </ul>
                  <div className="drawer-footer">Workspace ready</div>
                </motion.aside>
              ) : null}
            </AnimatePresence>

            {!reduceMotion ? (
              <motion.div
                className="demo-cursor"
                animate={
                  phase === 'idle'
                    ? { left: '72%', top: '28%', scale: 1 }
                    : phase === 'aim' || phase === 'press'
                      ? { left: '78%', top: '54%', scale: pressing ? 0.88 : 1 }
                      : { left: '86%', top: '42%', scale: 1 }
                }
                transition={{ duration: phase === 'press' ? 0.18 : 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={`cursor-dot${pressing ? ' is-click' : ''}`} />
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
