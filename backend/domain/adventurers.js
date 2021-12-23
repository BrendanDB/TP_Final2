import adventurersDB from "../database/adventurersDB.js";

const createAdventurer = async (username, password) => {
  const newAdventurer = {
    username: username,
    password: password,
    xp: 0,
    quests: [],
  };
  await adventurersDB.addAdventurer(newAdventurer);
};

const getAdventurerByNameAndPassword = async (username, password) => {
  try {
    const adventurer = await adventurersDB.findByName(username);
    if (adventurer !== undefined && adventurer.password === password)
      return adventurer;
  } catch (e) {
    throw new Error("Wrong name or password");
  }
};

const getQuests = async (username) => {
  try {
    const adventurer = await adventurersDB.findByName(username);
    return adventurer.quests;
  } catch (e) {
    throw new Error("Adventurer not found");
  }
};

const addNewQuest = async (name, level, completionXP, username) => {
  const quest = {
    name: name,
    level: level,
    completionXP: completionXP,
    complete: false,
  };
  try {
    await adventurersDB.addQuest(quest, username);
  } catch (e) {
    throw new Error("Wrong name or password");
  }
};

const completeQuest = async (questId, username) => {
  try {
    const adventurer = await adventurersDB.findByName(username);
    if (adventurer !== undefined) {
      adventurer.quests[questId].complete = true;
      adventurer.xp += parseInt(adventurer.quests[questId].completionXP);
      await adventurersDB.updateById(adventurer._id, adventurer);
    }
  } catch (e) {
    throw new Error("Wrong name or password");
  }
};

export default {
  createAdventurer,
  getAdventurerByNameAndPassword,
  getQuests,
  addNewQuest,
  completeQuest,
};
