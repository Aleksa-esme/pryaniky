import { BaseApi, APIError } from './baseApi';
import { TableReqData } from 'api';

const header = { 'x-auth': 'supersecrettoken_for_user17' };

export class DataApi extends BaseApi {
  constructor() {
    super('/ru/data/v3/testmethods/docs/userdocs');
  }

  get() {
    return this.http.get<void | APIError>('/get', {
      headers: header,
    });
  }

  send(payload: TableReqData) {
    return this.http.post<void | APIError>('/create', {
      data: payload,
      headers: header,
    });
  }

  edit(id: string, payload: TableReqData) {
    return this.http.post<void | APIError>(`/set/${id}`, {
      data: payload,
      headers: header,
    });
  }

  delete(id: string) {
    return this.http.post<void | APIError>(`/delete/${id}`, {
      headers: header,
    });
  }
}

export const dataApi = new DataApi();
