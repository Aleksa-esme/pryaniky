import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getData } from 'controllers/tableController';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'companySigDate', headerName: 'Company Sig Date', flex: 1, minWidth: 100},
  { field: 'companySignatureName', headerName: 'Company Signature Name', flex: 1, minWidth: 100},
  { field: 'documentName', headerName: 'Document Name', flex: 1, minWidth: 100},
  { field: 'documentStatus', headerName: 'Document Status', flex: 1, minWidth: 100},
  { field: 'documentType', headerName: 'Document Type', flex: 1, minWidth: 100},
  { field: 'employeeNumber', headerName: 'Employee Number', flex: 1, minWidth: 100},
  { field: 'employeeSigDate', headerName: 'Employee Sig Date', flex: 1, minWidth: 100},
  { field: 'employeeSignatureName', headerName: 'Employee Signature Name', flex: 1, minWidth: 100},
];
   
export const Table: FC = () => {
  const dispatch = useAppDispatch();
  const { tableData } = useAppSelector(state => state.appData);
  
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  
  return (
    <div style={{ height: '80vh', margin: '40px' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        checkboxSelection
        autoPageSize
      />
    </div>
  );
};
