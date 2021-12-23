import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Quests from "./Quests";
import AddQuest from "./AddQuest";

const drawerWidth = 250;

const MainPage = (props) => {
  const navigate = useNavigate();
  const { token } = props;
  const [adventurer, setAdventurer] = React.useState();
  const [niveau, setNiveau] = React.useState();

  React.useEffect(() => {
    const { token } = props;
    const f = async () => {
      try {
        const adventurerRequest = await axios({
          method: "get",
          url: "http://localhost:3001/me",
          headers: {
            Authorization: "BEARER " + token,
          },
        });
        setAdventurer(adventurerRequest.data);
        setNiveau(Math.floor(adventurerRequest.data.xp / 100));
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Main Page
          </Typography>
          <Typography>Level {niveau}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button key={"Quests"} onClick={() => navigate("/complete")}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary={"Quests"} />
          </ListItem>
          <ListItem button key={"AddQuest"} onClick={() => navigate("/quests")}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Add a Quest"} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main">
        <Routes sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>
          <Route
            path="/complete"
            element={
              <Quests
                token={token}
                adventurer={adventurer}
                niveau={niveau}
                setNiveau={setNiveau}
              />
            }
          />
          <Route
            path="/quests"
            element={
              <AddQuest token={token} adventurer={adventurer} niveau={niveau} />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainPage;
