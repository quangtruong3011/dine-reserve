import * as Yup from 'yup';
export const createOrEditTableSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    capacity: Yup.number().required("Capacity is required"),
    status: Yup.string().required("Status is required"),
});