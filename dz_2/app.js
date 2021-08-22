const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')

const {PORT} = require('./config/variables')

const app = express()

app.listen(PORT,()=>{
    console.log("APP LISTEN",PORT);
})