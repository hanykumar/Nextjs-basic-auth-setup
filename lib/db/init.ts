import { getDB } from './client';

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
`;

export function initializeDatabase() {
  const db = getDB();
  db.exec(schema);
}

export function getUserByEmail(email: string) {
  const db = getDB();
  const stmt = db.prepare('SELECT id, email, password_hash, is_admin, created_at FROM users WHERE email = ?');
  return stmt.get(email);
}

export function getUserById(id: string) {
  const db = getDB();
  const stmt = db.prepare('SELECT id, email, is_admin, created_at FROM users WHERE id = ?');
  return stmt.get(id);
}

export function createUser(id: string, email: string, passwordHash: string, isAdmin: boolean = false) {
  const db = getDB();
  const stmt = db.prepare(
    'INSERT INTO users (id, email, password_hash, is_admin) VALUES (?, ?, ?, ?)'
  );
  return stmt.run(id, email, passwordHash, isAdmin ? 1 : 0);
}

export function getSessionById(id: string) {
  const db = getDB();
  const stmt = db.prepare('SELECT * FROM sessions WHERE id = ? AND expires_at > datetime("now")');
  return stmt.get(id);
}

export function createSession(id: string, userId: string, token: string, expiresAt: Date) {
  const db = getDB();
  const stmt = db.prepare(
    'INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)'
  );
  return stmt.run(id, userId, token, expiresAt.toISOString());
}

export function deleteSession(id: string) {
  const db = getDB();
  const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
  return stmt.run(id);
}

export function deleteExpiredSessions() {
  const db = getDB();
  const stmt = db.prepare('DELETE FROM sessions WHERE expires_at <= datetime("now")');
  return stmt.run();
}
