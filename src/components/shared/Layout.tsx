import type { ReactNode } from "react";
import type { NextPage } from "next";
import { Box } from "@mui/material";
import Head from "next/head";
import Navbar from "@/components/shared/Navbar";
import { TITLE_SITE } from "@/constants";

interface Props {
  children: ReactNode;
  title?: string;
}

const Layout: NextPage<Props> = ({ children, title }) => {
  const headTitle = `${TITLE_SITE} | ${title || "App"}`;
  return (
    <Box flexGrow={1}>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Navbar />
      <Box px={5} py={11}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
