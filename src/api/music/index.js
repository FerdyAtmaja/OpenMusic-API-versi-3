const MusicHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name : 'music',
  version: '1.0.0',
  register: async (server, { service, validator, cacheService }) => {
    const musicHandler = new MusicHandler(service, validator, cacheService);
    server.route(routes(musicHandler));
  },
};