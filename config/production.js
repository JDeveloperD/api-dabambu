const fs = require('fs')
const chalk = require('chalk')

if (!fs.existsSync('.env')) {
  throw new Error(chalk.bgRed('🔥🔥 => No existe el archivo .env cree una copia del archivo .env.example y coloque los valores de producción'))
}

/**
 * dotenv.config({ path: '.env.example' })
 */

require('dotenv').config()

const SERVER = {
  HOST: process.env.HOST,
  PORT: 8080,
  HTTPS: false, // CAMBIAR A TRUE CUANDO SE TENGAN LAS KEYS
  DOMAIN_NAME_CERT: null
}

const DATABASE = {
  MONGODB_URI: process.env.MONGODB_URI,
  MYSQL_URI: 'string-connection-mysql'
}

const JSWT = {
  SESSION_SECRET: process.env.JSWT_SESSION_SECRET,
  SESSION_EXPIRE_IN: '2d'
}

const LOGGER = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'

module.exports = {
  SERVER,
  DATABASE,
  LOGGER,
  JSWT
}
