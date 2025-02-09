const http = require('http')
const morgan = require('morgan')
const dotenv = require('dotenv')
const express = require('express')
const Filter = require('bad-words')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const Utils = require('./utils/utils')
const AuthRouter = require('./routers/auth_router')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))
app.use('/hiskytechapi/v1/auth', AuthRouter)
app.use('/hiskytechapi/v1/chat', AuthRouter)

mongoose
    .connect(process.env.DB)
    .then(() => console.log(`MongoDB Database Successfully Connected  ✅`))
    .catch((err) => console.log(err))

app.all('*', (req, _, next) =>
    next(
        new Utils.AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    )
)

app.use(Utils.globalErrorHandler)

const appListener = app.listen(PORT, () =>
    console.log(
        `Server is running on port ${process.env.HOST}:${process.env.PORT} 🔥`
    )
)

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
    console.log(err.name, err.message)
    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...')
    console.log(err.name, err.message)
    appListener.close(() => {
        process.exit(1)
    })
})
