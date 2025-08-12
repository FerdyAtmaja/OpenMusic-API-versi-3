const mapDBToModel = ({
  id,
  title,
  name,
  year,
  genre,
  performer,
  duration,
  albumId,
  username,
  songs,
  cover,
}) => ({
  id,
  title,
  name,
  year,
  genre,
  performer,
  duration,
  albumId,
  username,
  songs,
  cover,
});

module.exports = { mapDBToModel };