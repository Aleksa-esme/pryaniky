import { setData, setLoading } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils';

const HOST = 'https://test.v5.pryaniky.com';

type TableResData = {
  id: string, 
  companySigDate: string, 
  companySignatureName: string, 
  documentName: string,
  documentStatus: string, 
  documentType: string, 
  employeeNumber: string, 
  employeeSigDate: string, 
  employeeSignatureName: string,
}
type TableReqData = {
  companySigDate: Date, 
  companySignatureName: FormDataEntryValue, 
  documentName: FormDataEntryValue,
  documentStatus: FormDataEntryValue, 
  documentType: FormDataEntryValue, 
  employeeNumber: FormDataEntryValue, 
  employeeSigDate: Date, 
  employeeSignatureName: FormDataEntryValue,
}

export const getData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
    headers: {
      'x-auth': 'supersecrettoken_for_user17'
    },
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  let result = await response.json();

  dispatch(setData(result.data));
  dispatch(setLoading(false));
};

export const sendData = (data: any) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
    method: 'POST',
    headers: {
      'x-auth': 'supersecrettoken_for_user17',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  dispatch(getData());
};

export const deleteData = (id: number) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
    method: 'POST',
    headers: {
      'x-auth': 'supersecrettoken_for_user17',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(id)
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  dispatch(getData());
};

export const editData = (id: string, data: any) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
    method: 'POST',
    headers: {
      'x-auth': 'supersecrettoken_for_user17',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  dispatch(getData());
};
