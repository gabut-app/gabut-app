require('dotenv').config()

const express = require('express')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)
app.use(errHandler) // ini harus dibawah router disimpennya

app.listen(port, _=> console.log('listen on port:', port))