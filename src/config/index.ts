import dotenv from 'dotenv'

dotenv.config()

export default {
  dbAuthSource: process.env.DB_AUTH_SOURCE ?? 'admin',
  dbUser: process.env.DB_USER ?? 'root',
  dbPassword: process.env.DB_PASSWORD ?? 'root',
  appPort: process.env.APP_PORT ?? '3000'
}
