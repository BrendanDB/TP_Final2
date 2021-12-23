import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import axios from "axios";

const AddQuest = (props) => {
  const { token } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const f = async () => {
      try {
        const addQuest = await axios({
          method: "post",
          url: "http://localhost:3001/quests",
          headers: {
            Authorization: "BEARER " + token,
          },
          data: {
            name: data.get("name"),
            level: data.get("level"),
            completionXP: data.get("completionXP"),
          },
        });
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  return (
    <Paper
      elevation={10}
      sx={{
        padding: "25px",
        heigth: "400px",
        margin: "15px",
        marginTop: "80px",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Typography variant="h4">Ajouter une quête au journal</Typography>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="level"
              label="Level"
              type="level"
              id="level"
              autoComplete="current-level"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="completionXP"
              label="Completion XP"
              type="completionXP"
              id="completionXP"
              autoComplete="current-level"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter
          </Button>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddQuest;
