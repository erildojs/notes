require('express-async-errors')
require('dotenv').config()
const express = require('express')
const routes = require('./routes/index.js')
const AppError = require('./utils/AppError.js')
const migrationsRun = require('./database/sqlite/migrations/index.js')

migrationsRun()
const app = express()
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error)
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

app.listen(process.env.API_PORT, () => {
  console.log('server started!');
})