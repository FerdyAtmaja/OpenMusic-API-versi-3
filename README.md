# OpenMusic API Versi 3

OpenMusic API versi 3 dengan fitur ekspor playlist, upload cover album, like album, dan server-side caching.

## Fitur Baru

1. **Ekspor Playlist** - Ekspor daftar lagu dalam playlist melalui email
2. **Upload Cover Album** - Upload gambar sampul untuk album
3. **Like/Unlike Album** - Fitur menyukai dan batal menyukai album
4. **Server-side Caching** - Cache jumlah likes album menggunakan Redis

## Prerequisites

- Node.js
- PostgreSQL
- Redis
- RabbitMQ

## Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables di file `.env`:
```
# Server configuration
HOST=localhost
PORT=5000

# Database
PGUSER=admin
PGHOST=localhost
PGPASSWORD=admin
PGDATABASE=openmusic
PGPORT=5432

# JWT
ACCESS_TOKEN_KEY=your-access-token-key
REFRESH_TOKEN_KEY=your-refresh-token-key
ACCESS_TOKEN_AGE=1800

# RabbitMQ
RABBITMQ_SERVER=amqp://localhost

# Redis
REDIS_SERVER=127.0.0.1

# SMTP Mail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name
```

3. Run database migrations:
```bash
npm run migrate up
```

4. Start the server:
```bash
npm run start:dev
```

5. Start the consumer (in separate terminal):
```bash
npm run start:consumer
```

## API Endpoints

### Albums
- `POST /albums` - Tambah album
- `GET /albums/{id}` - Get album by ID
- `PUT /albums/{id}` - Update album
- `DELETE /albums/{id}` - Delete album
- `POST /albums/{id}/covers` - Upload cover album
- `POST /albums/{id}/likes` - Like album (requires auth)
- `DELETE /albums/{id}/likes` - Unlike album (requires auth)
- `GET /albums/{id}/likes` - Get album likes count

### Songs
- `POST /songs` - Tambah lagu
- `GET /songs` - Get all songs
- `GET /songs/{id}` - Get song by ID
- `PUT /songs/{id}` - Update song
- `DELETE /songs/{id}` - Delete song

### Users
- `POST /users` - Register user
- `GET /users/{id}` - Get user by ID

### Authentication
- `POST /authentications` - Login
- `PUT /authentications` - Refresh token
- `DELETE /authentications` - Logout

### Playlists
- `POST /playlists` - Create playlist (requires auth)
- `GET /playlists` - Get user playlists (requires auth)
- `DELETE /playlists/{id}` - Delete playlist (requires auth)
- `POST /playlists/{id}/songs` - Add song to playlist (requires auth)
- `GET /playlists/{id}/songs` - Get playlist songs (requires auth)
- `DELETE /playlists/{id}/songs` - Remove song from playlist (requires auth)
- `GET /playlists/{id}/activities` - Get playlist activities (requires auth)

### Collaborations
- `POST /collaborations` - Add collaboration (requires auth)
- `DELETE /collaborations` - Remove collaboration (requires auth)

### Exports
- `POST /export/playlists/{playlistId}` - Export playlist (requires auth)

## Testing

Import Postman collection dan environment yang disediakan untuk testing API.

## Architecture

- **Framework**: Hapi.js
- **Database**: PostgreSQL
- **Cache**: Redis
- **Message Broker**: RabbitMQ
- **Email**: Nodemailer
- **File Storage**: Local File System (dengan opsi AWS S3)