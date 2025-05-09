/**
 * @file app.error.js
 */

/**
 * Base class representing a custom application error.
 */
class AppError extends Error {
    constructor(message, statusCode, name) {
      super(message);
      this.statusCode = statusCode;
      this.name = name;
    }
  }
  
  /**
   * Represents an internal server error.
   */
  export class InternalServerError extends AppError {
    constructor(message) {
      super(message, 500, 'InternalServerError');
    }
  }
  
  /**
   * Represents a Bad Request error (HTTP 400).
   */
  export class BadRequestError extends AppError {
    constructor(message) {
      super(message, 400, 'BadRequestError');
    }
  }
  
  /**
   * Represents a "Not Found" error.
   */
  export class NotFoundError extends AppError {
    constructor(message) {
      super(message, 404, 'NotFoundError');
    }
  }
  
  /**
   * Represents an Unauthorized error (HTTP 401).
   */
  export class UnauthorizedError extends AppError {
    constructor(message) {
      super(message, 401, 'UnauthorizedError');
    }
  }
  
  /**
   * Represents a Forbidden error (HTTP 403).
   */
  export class ForbiddenError extends AppError {
    constructor(message) {
      super(message, 403, 'ForbiddenError');
    }
  }
  
  /**
   * Represents a Conflict error (HTTP 409).
   */
  export class ConflictError extends AppError {
    constructor(message) {
      super(message, 409, 'ConflictError');
    }
  }
  
  /**
   * Represents a Not Implemented error (HTTP 501).
   */
  export class NotImplementedError extends AppError {
    constructor(message) {
      super(message, 501, 'NotImplementedError');
    }
  }
  