const mapAlbumToModel = ({
  id,
  name,
  year,
  cover,
}) => ({
  id,
  name,
  year,
  cover,
});

const mapSongToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

const mapPlaylistToModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

module.exports = { mapAlbumToModel, mapSongToModel, mapPlaylistToModel };