const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || '27017';
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url);
    this.isConnected = false;
  }

  async isAlive() {
    if(!this.isConnected){
      try {
        await this.client.connect();
        this.isConnected = true;
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }else{
      return true;
    }
  }

  async nbUsers() {
    try {
      const db = this.client.db(this.database);
      const collection = db.collection('users');
      const count = await collection.countDocuments();
      return count;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db(this.database);
      const collection = db.collection('files');
      const count = await collection.countDocuments();
      return count;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }
}

const dbClient = new DBClient();

module.exports = { dbClient };
