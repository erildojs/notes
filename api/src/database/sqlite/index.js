const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('node:path')

async function sqliteConnection() {
  const database = await open({
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  })
  return database
}

module.exports = sqliteConnection

/**
 * CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT
 * name VARCHAR, email VARCHAR, password VARCHAR, avatar VARCHAR NULL,    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 * updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
 * 
 * ALTER TABLE users RENAME TO usuarios
 * 
 * ALTER TABLE users ADD status VARCHAR
 * ALTER TABLE users RENAME COLUMN status TO active
 * ALTER TABLE users DROP COLUMN active
 * 
 * INSERT INTO users (name, email, passwd) VALUES ()
 * 
 * SELECT name FROM users
 * 
 * UPDATE  users SET avatar = novoValor WHERE id = tal
 * 
 * DELETE FROM users WHERE id = tal 
 */