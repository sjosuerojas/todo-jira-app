import { createTheme } from "@mui/material";
import { orange, cyan, red } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: orange[700],
    },
    secondary: {
      main: cyan["A100"],
    },
    error: {
      main: red["A400"],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: orange[700] },
      },
    },
  },
});
