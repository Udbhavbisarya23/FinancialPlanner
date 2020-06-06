const express=require('express');
const app=express();
const cors=require('cors');
// const pool=require('./db');
const knex = require('knex')
const bcrypt = require('bcrypt')

//middleware
app.use(cors());
app.use(express.json());//req.body
const db = knex({
    client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'project'
  }
})
db.select('*').from('users').then(data => {
    console.log(data)
})

//routes

//signup

app.post('/signup', (req,res)=> {
    let {fname,minit,lname,ssn,password,username,salary,expenses,age} = req.body;
    console.log(req.body)
    bcrypt.hash(password, 0, function(err, hash) {
        console.log(hash)
        db('users')
        .returning('*')
        .insert({
            f_name: fname,
            m_init: '',
            l_name: lname,
            username: username,
            password: hash,
            ssn: ssn,
            curr_age: age,
            income: salary,
            expenses: expenses
        })
        .then(response => {
            res.json(response)
        })
    });
})


//login

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

// Initial setup 
app.listen(4000,()=>{
	console.log('Server has started on port 4000');
});

