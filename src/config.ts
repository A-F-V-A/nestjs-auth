import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
  return {
    mongo: {
      name       : process.env.DB_NAME,
      user       : process.env.DB_USERNAME,
      password   : process.env.DB_PASSWORD,
      port       : parseInt( process.env.DB_PORT,10),
      host       : process.env.DB_HOST,
      connection : process.env.DB_CONNECTION,
    },
    apiKey: process.env.API_KEY
  }
})
