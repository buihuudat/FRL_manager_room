import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Table = ({ rows = [], columns = [], height }) => {
  const { showSidebar } = useSelector((state) => state.app);

  return (
    <div
      style={{
        height: 600,
        width: `${
          !showSidebar ? "calc(100vw - 120px)" : `calc(100vw - 300px)`
        }`,
        overflowX: "auto",
      }}
    >
      <DataGrid
        rowSelection={false}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        rowHeight={height || 50}
        pageSizeOptions={[10, 20]}
      />
    </div>
  );
};

export default Table;
