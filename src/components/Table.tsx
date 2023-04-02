import { FC, useEffect, useState } from 'react';
import { parseISO, format } from "date-fns";
import { DataGrid, GridCellParams, GridColDef, MuiEvent } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getData, editData, deleteData } from 'controllers/tableController';
import { Modal, DeleteButton, Toast } from 'components';
import { ErrorBoundary } from 'utils';
import { TableResData } from 'api';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export const Table: FC = () => {
  const dispatch = useAppDispatch();
  
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState<TableResData | null>(null);
  const [focused, setFocused] = useState('');

  const { tableData, loading, alertMessage } = useAppSelector(state => state.appData);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const onEdit = (params: GridCellParams, event: MuiEvent<React.MouseEvent>) => {
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

    setFocused(params.field);
    setOpen(true);
  }

  const handleEdit: SubmitHandler<FieldValues> = ({
    companySignatureName, documentName, documentStatus, documentType, employeeNumber, employeeSignatureName
  }) => {
    // сделано так, что бы нельзя было изменить дату подписания
    if(row) {
      dispatch(editData(row.id, {
        companySignatureName, 
        documentName, 
        documentStatus, 
        documentType, 
        employeeNumber, 
        employeeSignatureName, 
        companySigDate: row.companySigDate, 
        employeeSigDate: row.employeeSigDate,
      }));
    }

    setOpen(false);
    setRow(null);
  }

  const handleClose = () => {
    setOpen(false);
    setRow(null);
    setFocused('');
  }

  const columns: GridColDef[] = [
    { field: 'companySigDate', 
      headerName: 'Company Sig Date', 
      flex: 1, 
      minWidth: 130, 
      renderCell: params => format(parseISO(params.row.companySigDate), 'dd.MM.yy kk:mm:ss')
    },
    { field: 'companySignatureName', headerName: 'Company Signature Name', flex: 1, minWidth: 100},
    { field: 'documentName', headerName: 'Document Name', flex: 1, minWidth: 100},
    { field: 'documentStatus', headerName: 'Document Status', flex: 1, minWidth: 100},
    { field: 'documentType', headerName: 'Document Type', flex: 1, minWidth: 100},
    { field: 'employeeNumber', headerName: 'Employee Number', flex: 1, minWidth: 100},
    { field: 'employeeSigDate', 
      headerName: 'Employee Sig Date', 
      flex: 1, 
      minWidth: 130, 
      renderCell: params => format(parseISO(params.row.employeeSigDate), 'dd.MM.yy kk:mm:ss')
    },
    { field: 'employeeSignatureName', headerName: 'Employee Signature Name', flex: 1, minWidth: 100},
    { field: 'deleteRow', 
      headerName: '', 
      sortable: false, 
      minWidth: 30, 
      renderCell: params => 
        <div style={{ width: '100%', textAlign: 'center' }}>
          <DeleteButton onSubmit={() => dispatch(deleteData(params.row.id))} />
        </div>
    },
  ];
  
  return (
    <div style={{ height: '74vh', margin: '40px 40px 20px' }}>
      <ErrorBoundary>
        <DataGrid
          rows={tableData}
          columns={columns}
          autoPageSize
          onCellDoubleClick={onEdit}
          loading={loading}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <Modal 
          open={open} 
          onClose={handleClose} 
          onSubmit={handleEdit} 
          title='Change data in the row' 
          data={row} 
          focusedFiled={focused}
        />
      </ErrorBoundary>
      {alertMessage && (
        <Toast 
          message={alertMessage.message} 
          isVisible={alertMessage.isVisible}
        />
      )}
    </div>
  );
};
