import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'
import { Observable } from 'rxjs'
import { Request } from 'express'

import config from '../../../config'
import { IS_PUBLIC_KEY } from '../../decortors/public.decorator'


@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler())
    if(isPublic) return true

    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header('Auth')
    const isAuth = authHeader === this.configService.apiKey

    if(!isAuth) throw new UnauthorizedException('Not allowed')

    return isAuth
  }
}
