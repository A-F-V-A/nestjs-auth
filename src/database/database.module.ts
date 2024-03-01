import { Module, Global } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
//import { MongoClient } from 'mongodb'

import config from '../config'

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          user,
          password,
          host,
          port,
          name,
          connection
        } = configService.mongo
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName: name
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'APP_NAME',
      useValue: 'NestJS'
    },
    /*{
      provide: 'MONGO',
      useFactory: async (configService:ConfigType<typeof config>) => {
        const {
          user,
          password,
          host,
          port,
          name,
          connection
        } = configService.mongo

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db(name)

        return database
      },
      inject: [config.KEY]
    }*/
  ],
  exports : ['APP_NAME',]
})
export class DatabaseModule {}
