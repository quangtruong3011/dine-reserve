import { Close } from "@mui/icons-material";
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import TableService from "../../../services/TableService";

const tableService = new TableService();

const validationSchema = Yup.object({
    tableNumber: Yup.string().required("Table Number is required"),
    capacity: Yup.number().required("Capacity is required"),
});

const CreateOrEditTable = ({ tableId, open, handleCloseDialog }) => {
    const [table, setTable] = useState({
        id: null || tableId,
        tableNumber: '',
        capacity: '',
        isAvailable: false
    });

    useEffect(() => {
        if (tableId !== null) {
            tableService.getById(tableId)
                .then((response) => {
                    setTable(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setTable({
                id: null,
                tableNumber: '',
                capacity: '',
                isAvailable: false
            });
        }
    }, [tableId]);

    const handleSave = (values) => {
        if (values?.id !== null) {
            tableService.update(tableId, values)
                .then(() => {
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            tableService.create(values)
                .then(() => {
                    handleCloseDialog();
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        tableService.getAll();
    }

    return (
        <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{tableId ? 'Edit Table' : 'Create Table'}</DialogTitle>
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
                    initialValues={table}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSave(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <TextField
                                name="tableNumber"
                                label="Table Number"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 3 }}
                                value={values.tableNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.tableNumber && Boolean(errors.tableNumber)}
                                helperText={touched.tableNumber && errors.tableNumber}
                            />

                            <TextField
                                name="capacity"
                                label="Capacity"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 3 }}
                                value={values.capacity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.capacity && Boolean(errors.capacity)}
                                helperText={touched.capacity && errors.capacity}
                            />

                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        name="isAvailable"
                                        color="primary"
                                        checked={values.isAvailable}
                                        onChange={handleChange}
                                    />
                                }
                                label="Is Available"
                            /> */}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ py: 1.5 }}
                            >
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default CreateOrEditTable;   