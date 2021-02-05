import { STATUS } from '../constants/response'

class CustomError extends Error {
  public readonly status: STATUS
  public readonly details: object

  protected constructor(message: string, status: STATUS, details = {}) {
    super(message)
    this.status = status
    this.details = details
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.NO_CONTENT)
  }
}

class InternalError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.INTER_ERROR)
  }
}

export {
  CustomError,
  NotFoundError,
  InternalError,
}