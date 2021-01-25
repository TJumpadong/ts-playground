import dotenv from 'dotenv'

dotenv.config()

export default {
  dbAuthSource: process.env.DB_AUTH_SOURCE,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
}
