const mongoAtlas = {
  user: 'pirii123',
  password: 'pirii123pw',
  nameDatabase: 'cryptomonitor',
};

const { user, password, nameDatabase } = mongoAtlas;

const db = {
  uri: `mongodb+srv://${user}:${password}@cm-cluster.3x00g.mongodb.net/${nameDatabase}?retryWrites=true&w=majority`,
  name: process.env.DB_NAME ? process.env.DB_NAME : 'cryptomonitor',
};

module.exports = db;
