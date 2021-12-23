import express from "express";
import jwt from "jsonwebtoken";
import adventurers from "./domain/adventurers.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    await adventurers.createAdventurer(username, password);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const adventurer = await adventurers.getAdventurerByNameAndPassword(
    username,
    password
  );
  if (adventurer != undefined) {
    const token = jwt.sign({ username, password }, "divinity");
    res.send(token);
  } else res.sendStatus(403);
});

const authenticate = async (req, res, next) => {
  // On ramasse le header d'authorization
  const authHeader = req.headers["authorization"];
  // On obtient le token à partir du header en enlevant le mot "BEARER"
  const token = authHeader && authHeader.split(" ")[1];
  // Si aucun token -> unauthorized
  if (token == null) return res.sendStatus(401);

  try {
    // Vérification du token selon notre secret
    const payload = await jwt.verify(token, "divinity");
    // Injection du token dans la requête pour demandeur
    req.userToken = payload;
    // Passage au prochain middleware ou la route demandée
    next();
  } catch (e) {
    // Vérification échouée -> forbidden
    return res.sendStatus(403);
  }
};

app.get("/me", authenticate, async (req, res) => {
  const response = await adventurers.getAdventurerByNameAndPassword(
    req.userToken.username,
    req.userToken.password
  );
  res.send(response);
});

app.get("/quests", authenticate, async (req, res) => {
  const response = await adventurers.getQuests(req.userToken.username);
  res.send(response);
});

app.post("/quests", authenticate, async (req, res) => {
  const response = await adventurers.addNewQuest(
    req.body.name,
    req.body.level,
    req.body.completionXP,
    req.userToken.username
  );
  res.send(response);
});

app.post("/quests/:questId", authenticate, async (req, res) => {
  const response = await adventurers.completeQuest(
    req.params.questId,
    req.userToken.username
  );
  res.send(response);
});

console.log("server starting");
app.listen(3001);
console.log("server started");
