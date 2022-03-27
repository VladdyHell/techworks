export default class CustomError {
  constructor(kind, message, errors, error) {
    this.kind = kind;
    this.msg = message;
    this.errors = errors;
    this.error = error; // assign inside catch block
    this.stack = new Error(this.message).stack;
    this.isError = true;
  }
}
