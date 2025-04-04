import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const SubDataGrid = ({ substitutes }) => {
  const columns = [
    {
      field: "lastName",
      headerName: "Sukunimi",
      width: 180,
      editable: false,
      headerClassName: "bg-gray-50 font-semibold",
    },
    {
      field: "firstName",
      headerName: "Etunimi",
      width: 180,
      editable: false,
      headerClassName: "bg-gray-50 font-semibold",
    },
    {
      field: "email",
      headerName: "Sähköposti",
      width: 250,
      editable: false,
      headerClassName: "bg-gray-50 font-semibold",
    },
    {
      field: "number",
      headerName: "Numero",
      width: 180,
      editable: false,
      headerClassName: "bg-gray-50 font-semibold",
    },
  ];

  const rows = substitutes.map((substitute) => ({
    id: substitute.id,
    lastName: substitute.lastName,
    firstName: substitute.firstName,
    email: substitute.email,
    number: substitute.number,
  }));

  return (
    <Paper elevation={0} className="border border-gray-200">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f3f4f6",
            padding: "12px 16px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#f9fafb",
          },
        }}
      />
    </Paper>
  );
};

export default SubDataGrid;
