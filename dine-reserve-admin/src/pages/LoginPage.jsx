import { Save } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/components/Loading";
import { AuthContext } from "../context/AuthContext";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            await login(values);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                bgcolor: 'background.paper',
                borderRadius: '10px',
                boxShadow: 3,
                p: 4,
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Typography variant="h5" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
                    Welcome back, please login to your account 🚀
                </Typography>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <TextField
                                name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 3 }}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 3 }}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isLoading}
                                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                                sx={{ py: 1.5 }}
                            >
                                {isLoading ? 'Loading...' : 'Login'}
                            </Button>
                        </Form>
                    )}
                </Formik>

                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
            <Loading loading={isLoading} />
        </Container>
    );
};

export default LoginPage;
