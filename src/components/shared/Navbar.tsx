import NextLink from "next/link";
import { AppBar, Toolbar, IconButton, Typography, Link } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { TITLE_SITE } from "@/constants";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href="/" passHref>
          <Typography>{TITLE_SITE}</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}
