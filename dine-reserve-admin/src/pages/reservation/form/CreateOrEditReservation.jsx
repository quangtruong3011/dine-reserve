import { Close } from '@mui/icons-material';
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Form, Formik } from 'formik';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    numberOfPeople: Yup.number().required('Number of People is required'),
    tableNumber: Yup.string().required('Table Number is required'),
    reservationDateTime: Yup.date().required('Reservation Date Time is required')
});

const CreateOrEditReservation = ({ reservationId, open, handleCloseDialog }) => {
    // const [tables, setTables] = useState([]);
    const [reservation, setReservation] = useState({
        id: reservationId,
        name: '',
        contactNumber: '',
        numberOfPeople: '',
        tableNumber: '',
        reservationDateTime: ''
    });

    useEffect(() => {
        if (reservationId) {
            const reservation = { id: 1, name: 'John Doe', contactNumber: '1234567890', numberOfPeople: 4, tableNumber: 'T001', reservationDateTime: '2022-01-01T12:00:00' };
            setReservation(reservation);
        }
    }, [reservationId]);

    const handleSave = (values) => {
        console.log(values);
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{reservationId ? 'Edit Reservation' : 'Create Reservation'}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <Close />
            </IconButton>
            <DialogContent>
                <Formik
                    initialValues={reservation}
                    enableReinitialize
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSave(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <Form>
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <TextField
                                label="Contact Number"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                margin="normal"
                                name="contactNumber"
                                value={values.contactNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.contactNumber && Boolean(errors.contactNumber)}
                                helperText={touched.contactNumber && errors.contactNumber}
                            />
                            <TextField
                                label="Number of People"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                margin="normal"
                                name="numberOfPeople"
                                value={values.numberOfPeople}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.numberOfPeople && Boolean(errors.numberOfPeople)}
                                helperText={touched.numberOfPeople && errors.numberOfPeople}
                            />
                            <Autocomplete
                                options={['T001', 'T002', 'T003']}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Table Number"
                                        variant="outlined"
                                        size="medium"
                                        fullWidth
                                        margin="normal"
                                        name="tableNumber"
                                        value={values.tableNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.tableNumber && Boolean(errors.tableNumber)}
                                        helperText={touched.tableNumber && errors.tableNumber}
                                    />
                                )}
                            />
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DateTimePicker
                                    sx={{
                                        mt: 2,
                                        mb: 2,
                                        width: '100%'
                                    }}
                                    label="Reservation Date Time"
                                    inputFormat="yyyy-MM-dd hh:mm a"
                                    value={moment(values.reservationDateTime)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

export default CreateOrEditReservation;