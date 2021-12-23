import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "tpfinal";
const collectionName = "adventurers";

const getCollection = async () => {
  client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return collection;
};

const closeConnection = async () => {
  await client.close();
};

const addAdventurer = async (adventurer) => {
  try {
    const collection = await getCollection();
    await collection.insertOne(adventurer);
    await closeConnection();
  } catch (e) {
    await closeConnection();
  }
};

const findByName = async (username) => {
  try {
    const collection = await getCollection();
    const res = await collection.find({}).toArray();
    const adventurer = res.filter((adven) => adven.username === username);
    if (adventurer === undefined) throw new Error("Adventurer not found");
    return adventurer[0];
  } catch (e) {
    throw e;
  } finally {
    await closeConnection();
  }
};

const updateById = async (id, adventurer) => {
  try {
    const collection = await getCollection();
    let updatedItems = await collection.updateOne(
      { _id: ObjectId(id) },
      { $set: adventurer }
    );
    if (updatedItems.matchedCount == 0) throw new Error("Adventurer not found");
  } catch (e) {
    throw e;
  } finally {
    await closeConnection();
  }
};

const addQuest = async (quest, username) => {
  const adventurer = await findByName(username);
  if (adventurer !== undefined) {
    adventurer.quests.push(quest);
    await updateById(adventurer._id, adventurer);
  } else
    throw "Adventurer does not exist or the quest has one its field is undefined";
};

export default {
  findByName,
  addAdventurer,
  addQuest,
  updateById,
};
