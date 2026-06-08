export class ApiClientError extends Error {
  public status: number;
  public response: Response | null;
  public data: unknown;

  constructor(status: number, message: string, response: Response | null, data : unknown = null) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.response = response;
    this.data = data;
  }

  isNetworkError(): boolean {
    return this.status === 0;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isTimeout(): boolean {
    return this.message.includes('timeout');
  }
}
