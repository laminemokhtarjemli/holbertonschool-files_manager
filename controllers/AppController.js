const RedisClient = require('../utils/redis');
const DBClient = require('../utils/db');

const redisClient = new RedisClient();
const dbClient = new DBClient();

const getStatus = (req, res) => {
res.status(200).send({
redis: redisClient.isAlive(),
db: dbClient.isAlive(),
});
};

const getStats = async (req, res) => {
const users = await dbClient.nbUsers();
const files = await dbClient.nbFiles();

res.status(200).send({
users,
files,
});
};

module.exports = {
getStatus,
getStats,
};