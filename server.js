const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const userRoutes = require("./api/routes/userRoutes.js")
const cors = require('cors')


const app = express();
app.use(cors());

// parse request of content-type: application/json
app.use(bodyParser.json());

// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))
app.use(expressJwt({secret: process.env.SECRET_KEY}).unless({path: ['/api/user/auth', '/api/user/register']}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  })

// Simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Mathar Rest API"})
})

app.use("/api/user", userRoutes)

app.set('port', process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(" Server is running on port", process.env.PORT)
})

// module.exports = app