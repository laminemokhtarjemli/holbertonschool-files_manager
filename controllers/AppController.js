const redisClient = require("../utils/redis");
const dbClient = require("../utils/db");

const getStatus = async (req, res) => {
  const redisStatus = redisClient.isAlive();
  const dbStatus = await dbClient.isAlive();

  return res.status(200).json({ redis: redisStatus, db: dbStatus });
};

const getStats = async (req, res) => {
  const nbUsers = await dbClient.nbUsers();
  const nbFiles = await dbClient.nbFiles();

  return res.status(200).json({ users: nbUsers, files: nbFiles });
};

module.exports = { getStatus, getStats };
