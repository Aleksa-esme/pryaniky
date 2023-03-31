import { setData } from 'store/reducers/appSlice';
import { AppDispatch } from 'store/store';
import { hasApiError, formatDate } from 'utils';

const HOST = 'https://test.v5.pryaniky.com';

type TableData = {
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

export const getData = () => async (dispatch: AppDispatch) => {
  const response = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
    headers: {
      'x-auth': 'supersecrettoken_for_user17'
    },
  });

  if (hasApiError(response)) {
    throw new Error(response.reason);
  }

  let result = await response.json();
  console.log(result);
  console.log(result.data);

  const arr = result.data.map((el: TableData) => {
    return {
      id: el.id, 
      companySigDate: formatDate(el.companySigDate), 
      companySignatureName: el.companySignatureName, 
      documentName: el.documentName,
      documentStatus: el.documentStatus, 
      documentType: el.documentType, 
      employeeNumber: el.employeeNumber, 
      employeeSigDate: formatDate(el.employeeSigDate), 
      employeeSignatureName: el.employeeSignatureName,
    }
  })

  dispatch(setData(arr));
};
