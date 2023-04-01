import { setData, setLoading, setAlertMessage } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils';

const HOST = 'https://test.v5.pryaniky.com';

export type TableResData = {
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
  companySigDate: Date | string, 
  companySignatureName: FormDataEntryValue, 
  documentName: FormDataEntryValue,
  documentStatus: FormDataEntryValue, 
  documentType: FormDataEntryValue, 
  employeeNumber: FormDataEntryValue, 
  employeeSigDate: Date | string, 
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
    dispatch(setAlertMessage({
      message: 'Не удалось получить данные',
      isVisible: true,
    }));
    throw new Error(response.reason);
  }

  let result = await response.json();

  dispatch(setData(result.data));
  dispatch(setLoading(false));
};

export const sendData = (data: TableReqData) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`, {
    method: 'POST',
    headers: {
      'x-auth': 'supersecrettoken_for_user17',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  });

  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Не удалось отправить данные',
      isVisible: true,
    }));
    throw new Error(response.reason);
  }

  dispatch(getData());
};

export const deleteData = (id: string) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {
    method: 'POST',
    headers: {
      'x-auth': 'supersecrettoken_for_user17',
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Не удалось удалить данные',
      isVisible: true,
    }));
    throw new Error(response.reason);
  }

  dispatch(getData());
};

export const editData = (id: string, data: TableReqData) => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${id}`, {
    method: 'POST',
    headers: {
      'x-auth': 'supersecrettoken_for_user17',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  });

  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Не удалось изменить данные',
      isVisible: true,
    }));
    throw new Error(response.reason);
  }

  dispatch(getData());
};
