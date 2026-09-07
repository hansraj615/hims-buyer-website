import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale } from '../i18n/useLocale'

type Phase =
  | 'idle'
  | 'aimUpload'
  | 'clickUpload'
  | 'photoOpen'
  | 'aimMark'
  | 'dropMark'
  | 'aimMark2'
  | 'dropMark2'
  | 'annotate'
  | 'hold'

const sequence: Array<{ phase: Phase; ms: number }> = [
  { phase: 'idle', ms: 1100 },
  { phase: 'aimUpload', ms: 1100 },
  { phase: 'clickUpload', ms: 420 },
  { phase: 'photoOpen', ms: 1600 },
  { phase: 'aimMark', ms: 900 },
  { phase: 'dropMark', ms: 700 },
  { phase: 'aimMark2', ms: 850 },
  { phase: 'dropMark2', ms: 700 },
  { phase: 'annotate', ms: 2400 },
  { phase: 'hold', ms: 2200 },
]

function cursorTarget(phase: Phase): { left: string; top: string; scale: number } {
  switch (phase) {
    case 'idle':
      return { left: '62%', top: '18%', scale: 1 }
    case 'aimUpload':
    case 'clickUpload':
      return { left: '78%', top: '22%', scale: phase === 'clickUpload' ? 0.88 : 1 }
    case 'photoOpen':
      return { left: '48%', top: '48%', scale: 1 }
    case 'aimMark':
    case 'dropMark':
      return { left: '42%', top: '44%', scale: phase === 'dropMark' ? 0.88 : 1 }
    case 'aimMark2':
    case 'dropMark2':
      return { left: '56%', top: '58%', scale: phase === 'dropMark2' ? 0.88 : 1 }
    case 'annotate':
    case 'hold':
      return { left: '84%', top: '52%', scale: 1 }
    default:
      return { left: '50%', top: '40%', scale: 1 }
  }
}

export function BodyMapDemo() {
  const { t } = useLocale()
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (reduceMotion) {
      setPhase('hold')
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

  const photoOpen =
    phase === 'photoOpen' ||
    phase === 'aimMark' ||
    phase === 'dropMark' ||
    phase === 'aimMark2' ||
    phase === 'dropMark2' ||
    phase === 'annotate' ||
    phase === 'hold'

  const mark1 = phase === 'dropMark' || phase === 'aimMark2' || phase === 'dropMark2' || phase === 'annotate' || phase === 'hold'
  const mark2 = phase === 'dropMark2' || phase === 'annotate' || phase === 'hold'
  const annotate = phase === 'annotate' || phase === 'hold'
  const pressing = phase === 'clickUpload' || phase === 'dropMark' || phase === 'dropMark2'
  const cursor = cursorTarget(phase)

  return (
    <section className="bodymap-demo section" id="bodymap">
      <div className="shell bodymap-demo-head">
        <p className="section-kicker">{t.bodyMap.kicker}</p>
        <h2 className="section-title">{t.bodyMap.title}</h2>
        <p className="section-lead">{t.bodyMap.lead}</p>
      </div>

      <div className="shell bodymap-stage">
        <div className="bodymap-scene">
          <img
            alt="HIMS consultation body map section with liver diagram and annotation panel"
            className="bodymap-screen"
            src="/screenshots/bodymap-section.jpg"
          />
          <div className="bodymap-scrim" />

          <motion.div
            className="bodymap-chrome"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bodymap-chrome-top">
              <div>
                <strong>Body map</strong>
                <span>Hans Raj · DEMOHIMS-ENC-000004</span>
              </div>
              <button className={`upload-chip${phase === 'aimUpload' || phase === 'clickUpload' ? ' is-focus' : ''}`} type="button">
                {t.bodyMap.upload}
              </button>
            </div>

            <div className="bodymap-chrome-body">
              <div className="bodymap-canvas-pane">
                <img alt="" className="bodymap-live-shot" src="/screenshots/bodymap-section.jpg" />
                <div className="bodymap-live-mask" aria-hidden="true" />
                <p className="bodymap-hint">Catalog silhouette · Liver · 2 marks</p>
              </div>

              <aside className={`bodymap-side${annotate ? ' is-active' : ''}`}>
                <p className="drawer-kicker">Annotation</p>
                <h3>{annotate ? 'Marker #1' : 'Select a mark'}</h3>
                <AnimatePresence mode="wait">
                  {annotate ? (
                    <motion.dl
                      key="filled"
                      className="anno-fields"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div>
                        <dt>Observation</dt>
                        <dd>swelling</dd>
                      </div>
                      <div>
                        <dt>Location</dt>
                        <dd>Liver · right</dd>
                      </div>
                      <div>
                        <dt>Size</dt>
                        <dd>2.4 × 1.8 cm</dd>
                      </div>
                    </motion.dl>
                  ) : (
                    <motion.p key="empty" className="anno-empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Click the image to place a pin or highlight.
                    </motion.p>
                  )}
                </AnimatePresence>
              </aside>
            </div>

            <AnimatePresence>
              {photoOpen ? (
                <motion.div
                  className="photo-popup"
                  initial={{ opacity: 0, scale: 0.88, x: '-50%', y: 'calc(-50% + 18px)' }}
                  animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, scale: 0.94, x: '-50%', y: 'calc(-50% + 10px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="photo-popup-bar">
                    <strong>Patient photo</strong>
                    <span>Consented · clinical use</span>
                  </div>
                  <div className="photo-popup-stage">
                    <img alt="Consented clinical photo of a patient forearm for marking" src="/screenshots/patient-photo-arm.jpg" />

                    <AnimatePresence>
                      {mark1 ? (
                        <motion.span
                          className="map-pin pin-1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                        >
                          1
                        </motion.span>
                      ) : null}
                      {mark2 ? (
                        <motion.span
                          className="map-pin pin-2"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                        >
                          2
                        </motion.span>
                      ) : null}
                      {mark1 ? (
                        <motion.span
                          className="map-ellipse"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45 }}
                        />
                      ) : null}
                    </AnimatePresence>

                    {annotate ? (
                      <motion.div
                        className="photo-callout"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        Swelling · distal forearm
                      </motion.div>
                    ) : null}
                  </div>
                  <div className="photo-popup-tools">
                    <span>Pin</span>
                    <span className="is-on">Highlight</span>
                    <span>Undo</span>
                    <span>Zoom +</span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {!reduceMotion ? (
              <motion.div
                className="demo-cursor"
                animate={{ left: cursor.left, top: cursor.top, scale: cursor.scale }}
                transition={{ duration: pressing ? 0.16 : 0.8, ease: [0.22, 1, 0.36, 1] }}
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
