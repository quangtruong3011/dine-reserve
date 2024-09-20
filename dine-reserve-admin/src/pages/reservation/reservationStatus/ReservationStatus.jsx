import { useEffect, useState } from "react";
import Layout from "../../../shared/layout/Layout";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CreateOrEditReservationStatus from "./form/CreateOrEditReservationStatus";

const ReservationStatus = () => {
    const [reservationsStatus, setReservationsStatus] = useState([]);
    const [open, setOpen] = useState(false);
    const [reservationStatusId, setReservationStatusId] = useState(null);

    const loadReservationsStatus = () => {
        const reservationsStatus = [
            { id: 1, status: 'Confirmed' },
            { id: 2, status: 'Cancelled' },
            { id: 3, status: 'Pending' },
        ];
        setReservationsStatus(reservationsStatus);
    };

    useEffect(() => {
        loadReservationsStatus();
    }, []);

    const handleCreate = () => {
        setReservationStatusId(null);
        setOpen(true);
    };

    const handleEdit = (id) => {
        setReservationStatusId(id);
        setOpen(true);
    };

    const handleDelete = (id) => {
        setReservationsStatus(reservationsStatus.filter((reservationStatus) => reservationStatus.id !== id));
    };

    const handleCloseDialog = () => {
        setOpen(false);
        loadReservationsStatus();
    }

    return (
        <Layout>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        marginRight: '16px'
                    }} variant="h5">Reservation Status</Typography>
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{ height: '75vh', width: '100%' }}>
                <DataGrid
                    rows={reservationsStatus}
                    columns={[
                        { field: 'status', headerName: 'Status', width: 150 },
                        {
                            field: 'actions',
                            headerName: 'Actions',
                            width: 200,
                            renderCell: (params) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                    <Button
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
                                </Box>
                            )
                        }
                    ]}
                    pageSize={10}
                    slots={{ toolbar: GridToolbar }}
                // checkboxSelection
                // disableSelectionOnClick
                />
            </Box>
            <CreateOrEditReservationStatus
                open={open}
                handleCloseDialog={handleCloseDialog}
                id={reservationStatusId}
            />
        </Layout>
    );
}

export default ReservationStatus;