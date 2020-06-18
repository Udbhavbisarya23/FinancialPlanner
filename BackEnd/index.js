const express=require('express');
const app=express();
const cors=require('cors');
const pool=require('./db');
const knex = require('knex');
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

//routes


// login
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

//sign up

app.post('/signup', (req,res)=> {
    let {fname,lname,ssn,password,username,salary,expenses,age} = req.body;
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


//create user

app.post("/users",async (req,res)=>{
    try{
        const{f_name}=req.body;
        const{m_init}=req.body;
        const{l_name}=req.body;
        const{ssn}=req.body;
        const{curr_age}=req.body;
        const{username}=req.body;
        const{password}=req.body;
        const{income}=req.body;
        const{expenses}=req.body;
        const newUser = await pool.query("INSERT INTO users VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",[f_name,m_init,l_name,ssn,curr_age,username,password,income,expenses]);
        res.json(newUser.rows);
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
})


//get users

app.get("/users", async(req,res)=>{
    try{
        const allUsers=await  pool.query("Select * from users");
        res.json(allUsers.rows);
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
} )

//get a users details

app.get("/users/",async(req,res)=>{
    try{
        const {username}=req.body;
        const user=await pool.query("Select * from users where username=$1",[username]);
        res.json(user.rows);
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
})

//update user password

app.post("/users/updatep",async(req,res)=>{
    try{
        const{username}=req.body;
        const{password}=req.body;
        const updateUser=await pool.query("update users set password=$1 where username=$2",[password,username])
        res.json("Password updated");
    }
    catch(e){
        console.error(e.message)
        res.json(e.message);
    }
})


//update user income and expenses

app.post("/users/updateie",async(req,res)=>{
    try{
        const{username}=req.body;
        const{income}=req.body;
        const{expenses}=req.body;
        const updateUser=await pool.query("update users set expenses=$1,income=$3 where username=$2",[expenses,username,income])
        res.json("Income and Expenses updated");
    }
    catch(e){
        console.error(e.message)
        res.json(e.message);
    }
})

//delete user

app.delete("/users",async(req,res)=>{
    try{
        const{username}=req.body;
        const deleteUser=await pool.query("Delete from users where username=$1",[username]);
        res.json("Account Deleted");
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
})

//create assets or updating them

app.post("/assets",async (req,res)=>{
    try{
        const{username}=req.body;
        const{check}=req.body;
        const{name_asset}=req.body;
        const{value_asset}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        if (check=="true"){
            const newAsset = await pool.query("INSERT INTO assets VALUES($1,$2,$3) RETURNING *",[ssn,name_asset,value_asset]);
            res.json(newAsset.rows);
        }
        else{
            const newAsset= await pool.query("UPDATE assets SET value_asset=$1 WHERE name_asset=$2 and user_ssn=$3 RETURNING *",[value_asset,name_asset,ssn]);
            if (newAsset.rowCount>0){
                res.json(newAsset.rows);
            }
            else{
                res.json("Error, Such an entry doesnt exist");
            }
        }
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
})

//view assets

app.get("/assets",async (req,res)=>{
	// console.log(JSON.stringify(req.headers.authorization))
    try{
        const username=req.headers.authorization;
        const user_ssn=await pool.query("SELECT ssn from userssn_to_username where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const listAssets= await pool.query("Select name_asset,value_asset from assets  where user_ssn=$1",[ssn]);
        res.json(listAssets.rows);
    }
    catch(err){
        console.error(err.message);
        res.json(err.message);
    }
})

//remove assets

app.delete("/assets",async(req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{name_asset}=req.body;
        const deleteAsset=await pool.query("Delete from assets where user_ssn=$1 and name_asset=$2",[ssn,name_asset]);
        res.json("Asset Deleted");
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
})

//create debts and updating debts

app.post("/debts",async (req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from userssn_to_username where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{check}=req.body
        const{name_debt}=req.body;
        const{price_debt}=req.body;
        if (check=="true"){
            const newDebt = await pool.query("INSERT INTO debts VALUES($1,$2,$3) RETURNING *",[ssn,name_debt,price_debt]);
            res.json(newDebt.rows);
        }
        else{
            const newDebt= await pool.query("UPDATE debts SET price_debt=$1 WHERE name_debt=$2 and user_ssn=$3 RETURNING *",[price_debt,name_debt,ssn]);
            if (newDebt.rowCount>0){
                res.json(newDebt.rows);
            }
            else{
                res.json("Error, Such an entry doesnt exist");
            }
        }
    }
    catch(e){
        console.error(e.message);
    }
})

//view debts

app.get("/debts",async (req,res)=>{
    try{
        const{username}=req.body;        
        const user_ssn=await pool.query("SELECT ssn from userssn_to_username where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const listDebts= await pool.query("Select name_debt,price_debt FROM debts WHERE user_ssn=$1",[ssn]);
        res.json(listDebts.rows);
    }
    catch(err){
        console.error(err.message);
    }
})

//remove debts

app.delete("/debts",async(req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{name_debt}=req.body;
        const deleteDebt=await pool.query("Delete from debts where user_ssn=$1 and name_debt=$2",[ssn,name_debt]);
        res.json("Debt Deleted");
    }
    catch(e){
        console.error(e.message);
    }
})

//total debt 
app.get("/totaldebt",async (req,res)=>{
    try{
        const{username}=req.header.authorization;
        const user_ssn=await pool.query("SELECT ssn from userssn_to_username where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const listDebt= await pool.query("Select tot_debt FROM totaldebt WHERE user_ssn=$1",[ssn]);
        res.json(listDebt.rows);
    }
    catch(err){
        console.error(err.message);
    }
})


//create Email or updating it

app.post("/emails",async (req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{check}=req.body;
        const{old}=req.body;
        const{email_id}=req.body;
        if (check=="true"){
            const newEmail = await pool.query("INSERT INTO email VALUES($1,$2) RETURNING *",[ssn,email_id]);
            res.json(newEmail.rows);
        }
        else{
            const newEmail = await pool.query("UPDATE email SET email_id=$1 where user_ssn=$2 and old=$3 RETURNING *",[email_id,ssn,old]);
            if (newEmail.rowCount>0){
                res.json(newEmail.rows);
            }
            else{
                res.json("Error, Such an entry doesnt exist");
            }
        }
    }
    catch(e){
        console.error(e.message);
    }
})

//view emails

app.get("/emails",async (req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const listEmails= await pool.query("Select email_id FROM emails WHERE user_ssn=$1",[ssn]);
        res.json(listEmails.rows);
    }
    catch(err){
        console.error(err.message);
    }
})

//remove email

app.delete("/emails",async(req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{email_id}=req.body;
        const deleteEmail=await pool.query("DELETE FROM emails WHERE user_ssn=$1 and email_id=$2",[ssn,email_id]);
        res.json("Email Deleted");
    }
    catch(e){
        console.error(e.message);
    }
})

// post plans
app.post("/plans",async (req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from userssn_to_username where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{plan_id}=req.body;
        const{ret_age}=req.body;
        const{no_of_kids}=req.body;
        const{emergency_savings}=req.body;
        const newPlan = await pool.query("INSERT INTO plans VALUES($1,$2,$3,$4,$5) RETURNING *",[ssn,plan_id,ret_age,no_of_kids,emergency_savings]);
        res.json(newPlan.rows);
    }
    catch(e){
        console.error(e.message);
        res.json(e.message);
    }
})

//view plans

app.get("/plans",async (req,res)=>{
    try{
        const username=req.headers.authorization;
        const user_ssn=await pool.query("SELECT ssn from userssn_to_username where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const listPlans= await pool.query("Select ret_age,no_of_kids,emergency FROM plans WHERE user_ssn=$1",[ssn]);
        res.json(listPlans.rows);
    }
    catch(err){
        console.error(err.message);
    }
})

//delete plans

app.delete("/plans",async(req,res)=>{
    try{
        const{username}=req.body;
        const user_ssn=await pool.query("SELECT ssn from users where username=$1",[username])
        ssn=user_ssn.rows[0].ssn;
        const{plan_id}=req.body;
        const deletePlan=await pool.query("DELETE FROM plans WHERE user_ssn=$1 and plan_id=$2",[ssn,plan_id]);
        res.json("Plan Deleted");
    }
    catch(e){
        console.error(e.message);
    }
})


app.listen(5000,()=>{
    console.log('Server has started on port 5000');
});