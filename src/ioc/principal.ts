import { interfaces } from "inversify-express-utils";
import { IUser } from "../interfaces/user";

class Principal implements interfaces.Principal {
  details: IUser

  constructor(details: IUser) {
    this.details = details
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(true);
  }

  isResourceOwner(resourceId: any): Promise<boolean> {
    return Promise.resolve(resourceId === 1111);
  }

  isInRole(role: string): Promise<boolean> {
    return Promise.resolve(role === "admin");
  }
}

export default Principal