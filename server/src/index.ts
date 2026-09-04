import { app } from './app.js'
import { config } from './config.js'
import { initDb } from './db.js'

const port = config.port

// Bind immediately so Hostinger/Passenger does not 503 while MySQL is connecting.
const server = app.listen(port, () => {
  console.log(`HIMS buyer API listening on port ${port}`)
})

try {
  await initDb()
  console.log('[db] connected')
} catch (error) {
  console.error('[db] startup failed:', error)
}

export default server
