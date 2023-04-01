import { setData, setLoading, setAlertMessage } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError } from 'utils';
import { dataApi, TableReqData } from 'api';

export const getData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  
  const response = await dataApi.get();

  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Не удалось получить данные',
      isVisible: true,
    }));
    
    throw new Error(response.reason);
  }

  dispatch(setData(response.data));
  dispatch(setLoading(false));
};

export const sendData = (data: TableReqData) => async (dispatch: AppDispatch) => {
  const response = await dataApi.send(data);

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
  const response = await dataApi.delete(id);

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
  const response = await dataApi.edit(id, data);

  if (hasApiError(response)) {
    dispatch(setAlertMessage({
      message: 'Не удалось изменить данные',
      isVisible: true,
    }));
    throw new Error(response.reason);
  }

  dispatch(getData());
};
