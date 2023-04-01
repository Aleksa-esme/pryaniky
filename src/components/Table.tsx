import { FC, FormEvent, useEffect, useState } from 'react';
import { parseISO, format } from "date-fns";
import { DataGrid, GridCallbackDetails, GridCellParams, GridColDef, MuiEvent } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getData, editData } from 'controllers/tableController';
import { Modal } from 'components';

export type Data = {
  id: string;
  companySigDate: string,
  companySignatureName: string,
  documentName: string,
  documentStatus: string,
  documentType: string,
  employeeNumber: string,
  employeeSigDate: string,
  employeeSignatureName: string,
}

const columns: GridColDef[] = [
  { field: 'companySigDate', headerName: 'Company Sig Date', flex: 1, minWidth: 100, renderCell: params => format(parseISO(params.row.companySigDate), 'dd.MM.yy kk:mm:ss')},
  { field: 'companySignatureName', headerName: 'Company Signature Name', flex: 1, minWidth: 100},
  { field: 'documentName', headerName: 'Document Name', flex: 1, minWidth: 100},
  { field: 'documentStatus', headerName: 'Document Status', flex: 1, minWidth: 100},
  { field: 'documentType', headerName: 'Document Type', flex: 1, minWidth: 100},
  { field: 'employeeNumber', headerName: 'Employee Number', flex: 1, minWidth: 100},
  { field: 'employeeSigDate', headerName: 'Employee Sig Date', flex: 1, minWidth: 100, renderCell: params => format(parseISO(params.row.employeeSigDate), 'dd.MM.yy kk:mm:ss')},
  { field: 'employeeSignatureName', headerName: 'Employee Signature Name', flex: 1, minWidth: 100},
];
   
export const Table: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<Data>();
  const { tableData, loading } = useAppSelector(state => state.appData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const onEdit = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
    event.preventDefault();

    setRow({
      id: params.row.id,
      companySigDate: params.row.companySigDate,
      companySignatureName: params.row.companySignatureName,
      documentName: params.row.documentName,
      documentStatus: params.row.documentStatus,
      documentType: params.row.documentType,
      employeeNumber: params.row.employeeNumber,
      employeeSigDate: params.row.employeeSigDate,
      employeeSignatureName: params.row.employeeSignatureName,
    })
    handleOpen();
  }

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const data = {
      companySigDate: row?.companySigDate,
      companySignatureName: formData.get('companySignatureName'),
      documentName: formData.get('documentName'),
      documentStatus: formData.get('documentStatus'),
      documentType: formData.get('documentType'),
      employeeNumber: formData.get('employeeNumber'),
      employeeSigDate: row?.employeeSigDate,
      employeeSignatureName: formData.get('employeeSignatureName'),
    };

    if(row) dispatch(editData(row.id, data));
    handleClose();
  }
  
  return (
    <div style={{ height: '74vh', margin: '40px 40px 20px' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        // checkboxSelection
        autoPageSize
        onCellDoubleClick={onEdit}
        loading={loading}
        // getRowId={(row) => {console.log(row.id); return row.id}}
        // isCellEditable={(params: GridCellParams) => {/*console.log('params',params);*/ return true}}
        // isRowSelectable={(params: GridRowParams) => {console.log('params',params); return true}}
      />
      <Modal 
        open={open} 
        onClose={handleClose} 
        onSubmit={handleSend} 
        title='Change data in the row' 
        data={row} 
      />
    </div>
  );
};
