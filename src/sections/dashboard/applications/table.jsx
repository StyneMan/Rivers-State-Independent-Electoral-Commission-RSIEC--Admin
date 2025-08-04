/* eslint-disable prettier/prettier */
import React from 'react';
import { useSelector } from 'react-redux';

import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid'

import ActionButton from './action';
import useApplications from '../../../hooks/use-applications';
import CustomNoRowsOverlay from "../../../components/custom-no-row";

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CustomToolbar = ({ gridRef, rows, columns }) => {
  const exportToExcel = () => {
    // Get the visible columns (filter out hidden ones)
    const visibleColumns = columns.filter(col => !col.hide);
    
    // Prepare data for Excel
    const excelData = rows.map(row => {
      const rowData = {};
      visibleColumns.forEach(col => {
        rowData[col.headerName || col.field] = row[col.field];
      });
      return rowData;
    });

    const worksheet = XLSX.utils?.json_to_sheet(excelData);
    const workbook = XLSX.utils?.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'export.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const visibleColumns = columns.filter(col => !col.hide);
    
    // Prepare table header
    const headers = visibleColumns.map(col => col.headerName || col.field);
    
    // Prepare table data
    const data = rows.map(row => 
      visibleColumns.map(col => {
        // Handle nested objects if needed
        if (col.valueGetter) {
          return col.valueGetter({ row });
        }
        return row[col.field];
      })
    );

    doc.autoTable({
      head: [headers],
      body: data,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 101, 241] } // MUI primary color
    });

    doc.save('export.pdf');
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button onClick={exportToExcel}>Export to Excel</Button>
      <Button onClick={exportToPDF}>Export to PDF</Button>
    </GridToolbarContainer>
  );
};

export default function ApplicationTable() {
  const { allApplications } = useSelector((state) => state.application);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25
  });
  const [loading, setLoading] = React.useState(false);
  const [filteredApplication, setFilteredApplication] = React.useState(allApplications?.data ?? []);

  const { data: applicationData } = useApplications(paginationModel.page + 1);

  const columns = [
    {
      field: 'applicant',
      headerName: 'Full Name',
      flex: 1,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{`${params?.row?.first_name} ${params.row?.last_name}`}</p>
    },
     {
      field: 'email_address',
      headerName: 'Email Address',
      flex: 1,
      renderCell: (params) => <p style={{ textTransform: 'lowercase', fontSize: 14 }}>{`${params?.row?.email_address}`}</p>
    },
     {
      field: 'phone_number',
      headerName: 'Phone Number',
      flex: 1,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{`${params?.row?.phone_number}`}</p>
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.category}</p>
    },
    {
      field: 'lga',
      headerName: 'Local Govt',
      flex: 1,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.lga}</p>
    },
    {
      field: 'qualification',
      headerName: 'Qualification',
      flex: 1,
      renderCell: (params) => <p style={{ textTransform: 'capitalize', fontSize: 14 }}>{params?.row?.qualification}</p>
    },
    {
      field: 'createdAt',
      headerName: 'Created On',
      width: 150,
      renderCell: (params) => <p>{`${new Date(params?.row?.created_at).toLocaleString('en-US')}`}</p>
    },
    {
      field: 'id',
      headerName: 'Action',
      width: 90,
      renderCell: (params) => <ActionButton row={params?.row} />
    }
  ];

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      // const newData = await loadServerRows(paginationModel.page, data);
      if (applicationData) {
        console.log('SECOND PAGE DATA', applicationData);
        setFilteredApplication(applicationData?.data);
      }

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, applicationData]);

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      {allApplications && allApplications?.data && filteredApplication && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={filteredApplication}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[25]}
          rowCount={allApplications?.totalItems}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            toolbar: CustomToolbar,
          }}
          slotProps={{
            toolbar: {
              rows: filteredApplication,
              columns: columns,
            }
          }}
        />
      )}
    </div>
  );
}
