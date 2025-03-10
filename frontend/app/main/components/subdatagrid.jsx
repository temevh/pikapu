import { DataGrid } from "@mui/x-data-grid";

const SubDataGrid = ({ substitutes }) => {
  const columns = [
    {
      field: "lastName",
      headerName: "Sukunimi",
      width: 150,
      editable: false,
    },
    {
      field: "firstName",
      headerName: "Etunimi",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Sähköposti",
      width: 110,
      editable: false,
    },
    {
      field: "number",
      headerName: "Numero",
      editable: false,
      width: 160,
    },
  ];

  const rows = [];

  substitutes.map((substitute) => {
    rows.push({
      id: substitute.id,
      lastName: substitute.lastName,
      firstName: substitute.firstName,
      email: substitute.email,
      number: substitute.number,
    });
  });

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default SubDataGrid;
