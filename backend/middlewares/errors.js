class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
module.exports = {
  BadRequestError, UnauthorizedError, NotFoundError, ConflictError, ForbiddenError,
};
