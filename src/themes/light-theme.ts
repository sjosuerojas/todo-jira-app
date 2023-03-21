import { createTheme } from "@mui/material";
import { grey, purple, cyan, red } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: grey["300"],
    },
    primary: {
      main: purple["900"],
    },
    secondary: {
      main: cyan["800"],
    },
    error: {
      main: red["A400"],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: purple[400] },
      },
    },
  },
});
