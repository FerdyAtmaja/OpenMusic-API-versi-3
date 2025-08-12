const autoBind = require('auto-bind');

class MusicHandler {
  constructor(service, validator, cacheService) {
    this._service = service;
    this._validator = validator;
    this._cache = cacheService;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request, _h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request, _h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request, _h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } = request.payload;

    const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler(request) {
    const { title, performer } = request.query;
    const songs = await this._service.getSongs(title, performer);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, _h) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request, _h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request, _h) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }

  async postAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.likeAlbum(credentialId, id);
    this._cache.delete(`album:${id}:likes`);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil disukai',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(request, _h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.unlikeAlbum(credentialId, id);
    this._cache.delete(`album:${id}:likes`);

    return {
      status: 'success',
      message: 'Album batal disukai',
    };
  }

  async getAlbumLikesHandler(request, h) {
    const { id } = request.params;
    const cacheKey = `album:${id}:likes`;

    try {
      const result = await this._cache.get(cacheKey);
      const response = h.response({
        status: 'success',
        data: {
          likes: JSON.parse(result),
        },
      });
      response.header('X-Data-Source', 'cache');
      return response;
    } catch {
      const likes = await this._service.getAlbumLikes(id);
      await this._cache.set(cacheKey, JSON.stringify(likes), 1800);

      return {
        status: 'success',
        data: {
          likes,
        },
      };
    }
  }
}

module.exports = MusicHandler;