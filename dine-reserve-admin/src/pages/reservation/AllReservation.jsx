import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Layout from "../../shared/layout/Layout";
import { Delete, Edit, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormatService } from "../../utils/FormatService";
import CreateOrEditReservation from "./form/CreateOrEditReservation";
import { ReservationService } from "../../services/ReservationService";

const formatService = new FormatService();
const reservationService = new ReservationService();

const AllReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [open, setOpen] = useState(false);
    const [reservationId, setReservationId] = useState(null);

    const loadReservations = () => {
        reservationService.getAll()
            .then((response) => {
                setReservations(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        loadReservations();
    }, []);

    const handleCreate = () => {
        setReservationId(null);
        setOpen(true);
    };

    const handleEdit = (id) => {
        setReservationId(id);
        setOpen(true);
    };

    const handleDelete = (id) => {
        reservationService.deleteReservation(id)
            .then(() => {
                setReservations(reservations.filter((reservation) => reservation.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseDialog = () => {
        setOpen(false);
        loadReservations();
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
                    Create Reservation
                </Button>
            </Box>
            <Box
                component="div"
                sx={{
                    height: "75vh",
                    width: "100%",
                }}
            >
                <DataGrid
                    rows={reservations}
                    columns={[
                        { field: 'name', headerName: 'Name', width: 150 },
                        { field: 'contactNumber', headerName: 'Contact Number', width: 150 },
                        { field: 'numberOfPeople', headerName: 'Number of People', width: 150 },
                        { field: 'tableNumber', headerName: 'Table Number', width: 150 },
                        {
                            field: 'reservationDateTime',
                            headerName: 'Reservation Date Time',
                            width: 200,
                            valueFormatter: (params) => formatService.dateTimeFormat(params.value)
                        },
                        {
                            field: 'actions',
                            headerName: 'Actions',
                            width: 150,
                            renderCell: (params) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(params.row.id)}
                                    >
                                        <Edit />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(params.row.id)}
                                    >
                                        <Delete />
                                    </Button>
                                </Box>
                            )
                        }
                    ]}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
            <CreateOrEditReservation
                open={open}
                handleCloseDialog={handleCloseDialog}
                reservationId={reservationId}
            />
        </Layout>
    );
}

export default AllReservation;