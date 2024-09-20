import { Box, Typography } from "@mui/material";

export const PageNotFound = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4" color="textSecondary">
                404 Page Not Found
            </Typography>
        </Box>
    );
}