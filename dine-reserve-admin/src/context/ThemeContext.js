import { createTheme } from "@mui/material";
import { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggelTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        setTheme(localTheme || "light");
    }, []);

    return (
        <ThemeContext.Provider value={{
            theme,
            toggelTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};
