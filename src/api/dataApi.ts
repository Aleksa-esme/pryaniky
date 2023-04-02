import { BaseApi, APIError } from './baseApi';
import { TableReqData } from 'api';
import { getTokenValue } from 'utils';

export class DataApi extends BaseApi {
  constructor() {
    super('/ru/data/v3/testmethods/docs/userdocs');
  }

  get() {
    return this.http.get<void | APIError>('/get', {
      headers: {
        'x-auth': getTokenValue(localStorage.getItem('tokenJWT') as string)
      },
    });
  }

  send(payload: TableReqData) {
    return this.http.post<void | APIError>('/create', {
      data: payload,
      headers: {
        'x-auth': getTokenValue(localStorage.getItem('tokenJWT') as string)
      },
    });
  }

  edit(id: string, payload: TableReqData) {
    return this.http.post<void | APIError>(`/set/${id}`, {
      data: payload,
      headers: {
        'x-auth': getTokenValue(localStorage.getItem('tokenJWT') as string)
      },
    });
  }

  delete(id: string) {
    return this.http.post<void | APIError>(`/delete/${id}`, {
      headers: {
        'x-auth': getTokenValue(localStorage.getItem('tokenJWT') as string)
      },
    });
  }
}

export const dataApi = new DataApi();
