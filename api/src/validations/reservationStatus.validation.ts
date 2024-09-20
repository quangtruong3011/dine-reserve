import * as Yup from 'yup';

export const reservationStatusSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
});