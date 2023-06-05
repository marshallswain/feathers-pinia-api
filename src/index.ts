import { app } from './app'
import { logger } from './logger'

const port = app.get('port')
const origin = app.get('origins').at(0)

app.listen(port).then(() => {
  logger.info(`Feathers app listening on ${origin}`)
})
