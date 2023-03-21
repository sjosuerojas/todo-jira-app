import { Grid } from "@mui/material";
import Layout from "@/components/shared/Layout";
import TaskContainer from "@/components/TaskContainer";

export default function Home() {
  return (
    <Layout title="Home">
      <Grid container spacing={2}>
        <TaskContainer />
      </Grid>
    </Layout>
  );
}
