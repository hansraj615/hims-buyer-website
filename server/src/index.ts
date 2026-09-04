import { app } from './app.js'
import { config } from './config.js'
import { initDb } from './db.js'

const port = process.env.PORT || config.port

app.listen(port, () => {
  console.log(`HIMS buyer API listening on port ${port}`)
})

void initDb()
  .then(() => console.log('[db] connected'))
  .catch((error) => console.error('[db] startup failed:', error))

export default app
