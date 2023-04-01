import { BaseApi, APIError } from './baseApi';
import { AuthReq } from 'api';

export class AuthApi extends BaseApi {
  constructor() {
    super('/ru/data/v3/testmethods/docs');
  }

  login(payload: AuthReq) {
    return this.http.post<void | APIError>('/login', {
      data: payload,
    });
  }
}

export const authApi = new AuthApi();
