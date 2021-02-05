// import { NextFunction, Request, Response } from 'express'
import { Request } from 'express'
import { injectable } from 'inversify'
import { interfaces } from 'inversify-express-utils'
import { IUser } from '../../interfaces/user'
import Principal from '../principal'

// TODO: implement principal
@injectable()
class AuthProvider implements interfaces.AuthProvider {
  // @inject(SERVICE_IDENTIFIER.USER) protected authService: AuthService

  async getUser (
    req: Request
    // res: Response,
    // next: NextFunction
  ): Promise<interfaces.Principal> {
    // const token = req.headers['x-auth-token']
    // const user = await this.authService.getUser(token)
    const user: IUser = { _id: '1' }
    const principal = new Principal(user)
    return principal
  }
}

export default AuthProvider
