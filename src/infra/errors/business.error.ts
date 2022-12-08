export class BusinessError extends Error {
  constructor(public error: Error | string, public key?: string) {
    super(error.toString());
  }
}
