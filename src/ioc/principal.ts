import { interfaces } from 'inversify-express-utils'
import { IUser } from '../interfaces/user'

class Principal implements interfaces.Principal {
  details: IUser

  constructor (details: IUser) {
    this.details = details
  }

  async isAuthenticated (): Promise<boolean> {
    return await Promise.resolve(true)
  }

  async isResourceOwner (resourceId: any): Promise<boolean> {
    return await Promise.resolve(resourceId === 1111)
  }

  async isInRole (role: string): Promise<boolean> {
    return await Promise.resolve(role === 'admin')
  }
}

export default Principal
