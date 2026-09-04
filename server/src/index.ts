import { app } from './app.js'
import { config } from './config.js'
import { initDb } from './db.js'

await initDb()

app.listen(config.port, config.host, () => {
  console.log(`HIMS buyer API listening on http://${config.host}:${config.port}`)
})
