import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Routes, Route } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";

const Quests = (props) => {
  const [quests, setQuests] = React.useState([]);
  const { token, niveau, setNiveau } = props;

  React.useEffect(() => {
    recupererQuests(token);
  }, []);

  const validerQuest = (key, token) => {
    const f = async () => {
      try {
        const validerRequest = await axios({
          method: "post",
          url: "http://localhost:3001/quests/" + key,
          headers: {
            Authorization: "BEARER " + token,
          },
        });
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
    recupererQuests(token);
  };

  const recupererXP = (token) => {
    const f = async () => {
      try {
        const adventurerRequest = await axios({
          method: "get",
          url: "http://localhost:3001/me",
          headers: {
            Authorization: "BEARER " + token,
          },
        });
        setNiveau(Math.floor(adventurerRequest.data.xp / 100));
      } catch (e) {
        console.log("Failed to connect " + e);
      }
    };
    f();
  };

  const recupererQuests = async (token) => {
    try {
      const questsRequest = await axios({
        method: "get",
        url: "http://localhost:3001/quests",
        headers: {
          Authorization: "BEARER " + token,
        },
      });
      setQuests(questsRequest.data);
    } catch (e) {
      console.log("Failed to connect " + e);
    }
    recupererXP(token);
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
      <Box>
        <Typography variant="h4">Quêtes en cours</Typography>
        {quests.map((quest, key) => {
          if (quest !== undefined) {
            if (quest.complete === false) {
              return (
                <Paper
                  elevation={5}
                  sx={{
                    padding: "10px",
                    heigth: "400px",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h5">{quest.name}</Typography>
                  <Typography>Level: {quest.level}</Typography>
                  <Typography>Complete for: {quest.completionXP} XP</Typography>
                  <br />
                  <Button
                    onClick={() => {
                      validerQuest(key, token);
                    }}
                    disabled={niveau < quest.level}
                  >
                    Complete
                  </Button>
                </Paper>
              );
            }
          }
        })}
      </Box>
      <br />
      <Box>
        <Typography variant="h4">Quêtes complétées</Typography>
        {quests.map((quest, key) => {
          if (quest !== undefined) {
            if (quest.complete === true) {
              return (
                <Paper
                  elevation={5}
                  sx={{
                    padding: "10px",
                    heigth: "400px",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h5">{quest.name}</Typography>
                  <Typography>Level: {quest.level}</Typography>
                  <Typography>Complete for: {quest.completionXP} XP</Typography>
                  <br />
                </Paper>
              );
            }
          }
        })}
      </Box>
    </Paper>
  );
};

export default Quests;
