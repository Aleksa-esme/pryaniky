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

export type TableReqData = {
  companySigDate: Date | string, 
  companySignatureName: FormDataEntryValue, 
  documentName: FormDataEntryValue,
  documentStatus: FormDataEntryValue, 
  documentType: FormDataEntryValue, 
  employeeNumber: FormDataEntryValue, 
  employeeSigDate: Date | string, 
  employeeSignatureName: FormDataEntryValue,
}

export type AuthReq = {
  login: string;
  password: string;
}
