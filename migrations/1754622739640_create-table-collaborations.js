exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlistId: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    userId: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // Add unique constraint to prevent duplicate collaborations
  pgm.addConstraint('collaborations', 'unique_playlistId_and_userId', 'UNIQUE("playlistId", "userId")');

  // Add foreign key constraints
  pgm.addConstraint('collaborations', 'fk_collaborations.playlistId_playlists.id', 'FOREIGN KEY("playlistId") REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('collaborations', 'fk_collaborations.userId_users.id', 'FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE');
};
