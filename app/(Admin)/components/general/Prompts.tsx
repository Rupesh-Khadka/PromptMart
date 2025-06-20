"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal } from "@mui/material";
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import { updatePromptStatus } from "../../action";

type PromptsDataTypes = {
  id: string;
  name: string;
  price: string;
  rating: number;
  purchased?: number;
  orders?: any[];
  status?: string;
};

const Prompts = ({ data }: { data: any[] | undefined }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(
    "Pending" as "Pending" | "Live" | "Declined"
  );
  const [promptId, setpromptId] = useState("");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Prompts Title", flex: 0.8 },
    { field: "price", headerName: "Prompts Price", flex: 0.5 },
    { field: "rating", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <div
            className="w-full flex items-center gap-2"
            onClick={() => setpromptId(params.row.id)}
          >
            <span>{params.row.status || ""}</span>
            <BsPencil
              className="text-sm cursor-pointer ml-2 "
              onClick={() => setOpen(true)}
            />
          </div>
        );
      },
    },
  ];

  const rows: Array<PromptsDataTypes> = [];

  data &&
    data.map((prompt) =>
      rows.push({
        id: prompt.id,
        name: prompt.name,
        price: prompt.price,
        rating: prompt.rating,
        purchased: prompt?.orders?.length,
        status: prompt.status,
      })
    );

  const updatePromptStatusHandler = async () => {
    await updatePromptStatus({ promptId, status });

    setOpen(false);
  };

  return (
    <>
      <Box m="40px">
        <Box
          m="40px 0 0 0"
          height="90vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              color: "#fff",
              borderBottom: "none",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                fontSize: "0.9rem",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#3e4396",
                color: "#fff",
              },
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-sortIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-menuIcon": {
              color: "#fff",
            },
            "& .MuiDataGrid-row": {
              color: "#fff",
              borderBottom: "1px solid #ffffff30!important",
              "&:hover": {
                backgroundColor: "#3e439620 !important",
              },
              "&.Mui-selected": {
                backgroundColor: "#3e439640 !important",
                "&:hover": {
                  backgroundColor: "#3e439640 !important",
                },
              },
            },
            "& .MuiTablePagination-root": {
              color: "#fff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none!important",
              "&:focus": {
                outline: "none !important",
              },
              "&:focus-within": {
                outline: "none !important",
              },
              textAlign: "center", // Center text in cells
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#3e4396",
              color: "#fff",
            },
            "& .MuiCheckbox-root": {
              color: `#b7ebde !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `#fff !important`,
            },
            "& .MuiDataGrid-cellCheckbox": {
              "& .MuiButtonBase-root": {
                color: "#fff !important",
              },
            },
            // Responsive styles
            "@media (max-width: 768px)": {
              "& .MuiDataGrid-root": {
                fontSize: "0.75rem",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "0.8rem",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.75rem",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "0.8rem",
              },
            },
            "@media (max-width: 480px)": {
              "& .MuiDataGrid-root": {
                fontSize: "0.65rem",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "0.7rem",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.65rem",
              },
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>

      {open && (
        <Modal
          open
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="w-full flex fixed top-0 left-0 h-screen z-[999999999999]"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className="text-2xl font-bold text-center text-white">
              Update Status
            </h1>
            <select
              name=""
              id=""
              className={`w-full text-white h-[40px] px-2 outline-none ont-Poppins !mt-6 bg-slate-900 border rounded p-2`}
              onChange={(e) =>
                setStatus(e.target.value as "Pending" | "Live" | "Declined")
              }
            >
              <option value="Pending">Pending</option>
              <option value="Live">Live</option>
              <option value="Declined">Declined</option>
            </select>
            <br />
            <button
              className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer  min-h-[45px] w-full text-[16px] font-Poppins font-semibold bg-[#3f4cda] my-6 !h-[35px]`}
              onClick={updatePromptStatusHandler}
            >
              Submit
            </button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Prompts;
