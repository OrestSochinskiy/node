const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs')

const {PORT} = require('./config/variables');
const users = require('./db/users');
const usersPath = path.join(__dirname,'db','users.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','.hbs');
app.engine('.hbs',expressHbs({defaultLayout: false}));
app.set('views',path.join(__dirname,'static'));

app.get('/',((req, res) => {
    res.render('hello');
}))

app.get("/login",(req, res) => {
    res.render('login');
})
app.post('/login',(req, res) => {
    const {email , password} = req.body;
    const userId = users.findIndex(u => u.email == email && u.password == password);
    if(userId === -1){
        res.redirect('/register');
        return;
    }
    else {
        res.redirect('/users/' + userId)
    }
})

app.get('/register',(req, res) => {
    res.render('register')
})
app.post('/register',(req, res) => {
    const email = req.body.email
    const emailIsFound = users.find(u => u.email == email)
    console.log(email);
    if (!emailIsFound){
        users.push(req.body)
        fs.writeFile(usersPath,`module.exports = ${JSON.stringify(users)}`,err => {
            if (err){
                console.log(err);
            }

        })
        res.redirect('/login')
        return
    }
    if(emailIsFound){
        res.redirect('/login')
    }
})

app.get('/users',(req, res) => {
    res.render('users',{users})
})

app.get('/users/:userId',(req, res) => {
    const {userId} = req.params;
    const currentUser = users[userId]
    res.render('userInfo',{currentUser})
})

app.listen(PORT,()=>{
    console.log("APP LISTEN",PORT);
})