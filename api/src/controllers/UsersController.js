
const hash = require('bcryptjs')
const sqliteConnection = require('../database/sqlite/index.js')
const AppError = require('../utils/AppError.js')

class UsersController {
  //index - varios
  //show - um apenas
  //create
  //update
  //delete
  async create(request, response) {
    const { name, email, password } = request.body
    const database = await sqliteConnection()
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if (checkUsersExists) {
      throw new AppError("Este email ja esta em uso.")
    }
    const hashedPassword = await hash.hash(password, 8)
    await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword])
    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { user_id } = request.params
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
    if (!user) {
      throw new AppError("Usuario nao encontrado.")
    }
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso.")
    }
    user.name = name ?? user.name
    user.email = email ?? user.email
    if (password && !old_password) {
      throw new AppError("Voce precisa informar a senha antiga para definir a nova senha")
    }
    if (password && old_password) {
      const checkOldPassword = await hash.compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError("A senha antiga nao confere")
      }
      user.password = await hash.hash(password, 8)
    }
    await database.run(`
      UPDATE users SET 
      name = ?, 
      email = ?, 
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id])
    return response.json()
  }

}

module.exports = UsersController