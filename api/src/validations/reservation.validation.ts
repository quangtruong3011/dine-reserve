import * as Yup from 'yup';

export const createOrEditReservationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  numberOfPeople: Yup.number().required("Number of people is required"),
  dateTime: Yup.date().required("Date and time is required"),
  message: Yup.string(),
});