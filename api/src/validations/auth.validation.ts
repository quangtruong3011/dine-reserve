import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  // fullName: Yup.string().required("Full Name is required"),
  // role: Yup.string().required("Role is required"),
});