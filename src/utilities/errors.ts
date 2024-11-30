export class SKError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// HTTP 400
export class BadRequestError extends SKError {
  constructor(message: string) {
    super(message);
  }
}

// HTTP 401
export class UnauthorizedError extends SKError {
  constructor(message: string) {
    super(message);
  }
}

// HTTP 403
export class ForbiddenError extends SKError {
  constructor(message: string) {
    super(message);
  }
}

// HTTP 404
export class NotFoundError extends SKError {
  constructor(message: string) {
    super(message);
  }
}

// HTTP 409
export class ConflictError extends SKError {
  constructor(message: string) {
    super(message);
  }
}

// HTTP 500
export class InternalServerError extends SKError {
  constructor(message: string) {
    super(message);
  }
}

// HTTP 501
export class NotImplementedError extends SKError {
  constructor(message: string) {
    super(message);
  }
}