export class LoggedOutError extends Error {
  constructor() {
    super("Authentication is required.");
    this.name = "LoggedOutError";
  }
}
