import { HTTPClient } from 'api/httpClient';

const HOST = 'https://test.v5.pryaniky.com';

export type APIError = {
  reason: string;
};

export class BaseApi {
  http: HTTPClient;

  constructor(protected readonly endnpoint: string) {
    this.http = new HTTPClient(HOST + endnpoint);
  }
}
