import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import ReservationStatusService from "../../../../services/ReservationStatusService";

const reservationStatusService = new ReservationStatusService();

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    // description: Yup.string().required('Description is required')
});

const CreateOrEditReservationStatus = ({ id, open, handleCloseDialog }) => {
    const [reservationStatus, setReservationStatus] = useState({
        id: id,
        name: '',
        // description: ''
    });

    useEffect(() => {
        if (id) {
            reservationStatusService.getById(id)
                .then((response) => {
                    setReservationStatus(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const handleSave = (values) => {
        if (id) {
            reservationStatusService.update(id, values)
                .then(() => {
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            reservationStatusService.create(values)
                .then(() => {
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle sx={{ m: 0, p: 2 }}>{id ? 'Edit Reservation Status' : 'Create Reservation Status'}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    // color: theme.palette.grey[500]
                }}>
                <Close />
            </IconButton>
            <DialogContent>
                <Formik
                    initialValues={reservationStatus}
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
                            {/* <TextField
                                label="Description"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                margin="normal"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            /> */}
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
    )
};

export default CreateOrEditReservationStatus;