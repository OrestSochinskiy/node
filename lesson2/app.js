const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')

const {PORT} = require('./config/variables')
const users = require('./db/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'static')))
app.set('view engine','.hbs')
app.engine('.hbs',expressHbs({defaultLayout: false  }))
app.set('views',path.join(__dirname,'static'))


app.get('/',(req,res )=>{
    console.log(req);
    // res.end('adadsa')
    // res.send('<h1>HELLO WORLD</h1>')
    // res.json({name : "Orest"})
    // res.write('hello')
    // res.write('world')
    // res.write('22')
    res.status(404).end('Not found')
})
app.get('/login',((req, res) => {
    res.render('login',{isMale : true})
}))

app.get('/users', (req, res) => {
    res.render('users',{userName : "Orest",users})
})
app.get('/users/:user_id',(req, res) => {
    const {user_id} = req.params
    console.log(req.query);
    const currentUser = users[user_id]
    if(!currentUser){
        res.status(404).end('User Not found ')
        return;
    }
    res.json(currentUser)
})

app.post('/auth',(req, res) => {
    console.log(req.body);
    const {name,password } = req.body
    res.json("LOGIN")
})


app.listen(PORT, () =>{
    console.log("App listen",PORT);
})