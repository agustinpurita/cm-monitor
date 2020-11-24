const server = {
  port: process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000,
  secret: 'piri',
};

module.exports = server;