const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

const db = knex({
    client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'wta'
  }
})

// db.select('*').from('test1').then(data => {
//     console.log(data)
// })

app.listen(4000,() => {
    console.log("App is running at port 4000")
})

app.get('/',(req,res) => {
    console.log("Connected")
    res.send("Get request")
})

// Functionalites needed for BackEnd
// Login Validation
app.post('/login', (req,res) => {
    let {username,password} = req.body;
    console.log(username)
    db.select('*').from('users').where({
        username: username
    })
    .then(response => {
        bcrypt.compare(password,response[0].password,function(err,result){
            console.log(result)
            if(result === true){
                res.json(response)
            }
            else{
                res.status('400').json('false')
            }
        })
    })
    .catch(err => {
        res.status('404').json('false')
    })
})

// Signup
app.post('/signup', (req,res)=> {
    let {fname,lname,email,password,username,salary,expenses,age} = req.body;
    bcrypt.hash(password, 0, function(err, hash) {
        console.log(hash)
        db('users')
        .returning('*')
        .insert({
            fname: fname,
            lname: lname,
            username: username,
            password: hash,
            emailid: email,
            age: age,
            salary: salary,
            expenses: expenses
        })
        .then(response => {
            res.json(response)
        })
    });
})


// Retrieving financial data for that user
app.get('/finance',(req,res) => {
    
    const {username} = req.query
    console.log(username)
    db.select('salary','expenses').from('users').where({
        username: username
    })
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        res.status('400').json('Invalid username in finance')
    })
})
// Updating financial data for user