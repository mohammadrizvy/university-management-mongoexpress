// TODO : Important concept / understand this concept later !! 😡
export class AppError extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string, stack = "") {
      super(message);
      this.statusCode = statusCode;
  
      if (stack) {
        this.stack = stack
      } else {
        Error.captureStackTrace(this, this.constructor)
      }
    }
  }