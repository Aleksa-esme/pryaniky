export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  data?: Record<string, any>;
  method?: Methods;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  retries?: number;
};

type MethodOptions = Omit<Options, 'method'>;

export class HTTPClient {
  constructor(private readonly baseUrl: string) {}

  get<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.GET });
  }

  post<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.POST });
  }

  put<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.PUT });
  }

  delete<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.DELETE });
  }

  fetch<T>(url: string, options: Options) {
    return this._fetchWithRetry<T>(url, options);
  }

  private _httpStatusIsValid(httpStatus: number) {
    if (httpStatus === 409) {
      return false;
    }

    if (httpStatus >= 500) {
      return false;
    }

    return true;
  }

  private _shouldRetry(response: Response, retries: number) {
    if (!retries) {
      return false;
    }

    return !this._httpStatusIsValid(response.status);
  }

  private _fetchWithRetry<T>(
    url: string,
    options: Options = {}
  ): any {
    const { retries = 1 } = options;

    const onError = (error: unknown) => {
      if (error instanceof Response) {
        const triesLeft = retries - 1;

        if (!this._shouldRetry(error, triesLeft)) {
          throw new Error(error.statusText);
        }

        return this._fetchWithRetry<T>(url, { ...options, retries: triesLeft });
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Failed to request');
    };

    return this._request(url, options).catch(onError);
  }

  private async _request(
    url: string,
    options: Options = {}
  ): Promise<void> {
    const {
      method = Methods.GET,
      data,
      headers = {},
      signal,
    } = options;
    const isFormData = data instanceof FormData;
    const httpHeaders = new Headers();

    if (data && !isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    for (const [key, value] of Object.entries(headers)) {
      httpHeaders.append(key, value);
    }

    const response = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: httpHeaders,
      mode: 'cors',
      signal,
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      return Promise.reject(response);
    }

    const contentType = response.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    return isJson ? response.json() : null;
  }
}
