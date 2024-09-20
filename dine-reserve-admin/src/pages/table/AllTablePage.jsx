import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Layout from "../../shared/layout/Layout";
import { DataGrid } from "@mui/x-data-grid";
import CreateOrEditTable from "./form/CreateOrEditTable";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import TableService from "../../services/TableService";

const tableService = new TableService();

const AllTablePage = () => {
    const [tables, setTables] = useState([]);
    const [open, setOpen] = useState(false);
    const [tableId, setTableId] = useState(null);

    const [pageSize, setPageSize] = useState(null);

    const loadTables = () => {
        tableService.getAll()
            .then((response) => {
                setTables(response.data.data);
                setPageSize(response.data.length);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadTables();
    }, []);

    const handleCreate = () => {
        setTableId(null);
        setOpen(true);
    };

    const handleEdit = (id) => {
        setTableId(id);
        setOpen(true);
    };

    const handleDelete = (id) => {
        tableService.delete(id)
            .then(() => {
                setTables(tables.filter((table) => table.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseDialog = () => {
        setOpen(false);
        loadTables();
    }

    return (
        <Layout>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Box>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                >
                    Create Table
                </Button>
            </Box>
            <div style={{ height: '75vh', width: '100%' }}>
                <DataGrid
                    rows={tables}
                    columns={[
                        { field: 'tableNumber', headerName: 'Table Number', width: 150 },
                        { field: 'capacity', headerName: 'Capacity', width: 150 },
                        { field: 'status', headerName: 'Status', width: 150, },
                        {
                            field: 'actions',
                            headerName: 'Actions',
                            width: 200,
                            renderCell: (params) => (
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Button
                                        sx={{
                                            color: 'white',
                                            backgroundColor: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: 'primary.dark'
                                            }
                                        }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(params.row.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(params.row.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )
                        }
                    ]}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5]}
                    // checkboxSelection
                    // disableSelectionOnClick
                />
            </div>
            <CreateOrEditTable
                open={open}
                handleCloseDialog={handleCloseDialog}
                tableId={tableId}
            />
        </Layout>
    );
}

export default AllTablePage;
