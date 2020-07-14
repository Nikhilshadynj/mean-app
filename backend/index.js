const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 3000
require('./db/mongoose')
const userRouter = require('./routers/users')
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter)
app.use(cors())
 
app.use(cookieSession({
    name: 'angular-session',
    keys: ['key1', 'key2']
  }))


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)    
})