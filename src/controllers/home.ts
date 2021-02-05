import { controller, httpGet } from 'inversify-express-utils'

@controller('/')
class HomeController {
  @httpGet('/')
  public get(): string {
    return 'ok'
  }
}

export default HomeController