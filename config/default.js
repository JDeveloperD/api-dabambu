const SERVER = {
  HOST: 'http://localhost',
  PORT: 3000,
  HTTPS: false
}

const DATABASE = {
  MONGODB_URI: 'mongodb+srv://userExample:zAaCmbYs8MMoe68e@cluster0.75em6.mongodb.net/db_develop?retryWrites=true&w=majority',
  MYSQL_URI: ''
}

const LOGGER = 'dev'

const JSWT = {
  SESSION_SECRET: 'secret',
  SESSION_EXPIRE_IN: '2m'
}

module.exports = {
  SERVER,
  DATABASE,
  LOGGER,
  JSWT
}
