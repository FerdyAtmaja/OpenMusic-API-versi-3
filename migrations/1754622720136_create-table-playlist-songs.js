exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlistId: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    songId: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // Add foreign key constraints
  pgm.addConstraint('playlist_songs', 'fk_playlist_songs.playlistId_playlists.id', 'FOREIGN KEY("playlistId") REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('playlist_songs', 'fk_playlist_songs.songId_songs.id', 'FOREIGN KEY("songId") REFERENCES songs(id) ON DELETE CASCADE');
};
