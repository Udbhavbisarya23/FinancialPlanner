const express=require('express');
const app=express();
const cors=require('cors');
const pool=require('./db');

//middleware
app.use(cors());
app.use(express.json());//req.body

//routes

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
	}
})


//get users

app.get("/", async(req,res)=>{
	try{
		const allUsers=await  pool.query("Select * from users");
		res.json(allUsers.rows);
	}
	catch(e){
		console.error(e.message);
	}
} )

//get a users details

app.get("/users/:username",async(req,res)=>{
	try{
		const {username}=req.params;
		const user=await pool.query("Select * from users where username=$1",[username]);
		res.json(user.rows);
	}
	catch(e){
		console.error(e.message);
	}
})


//update user password

app.put("/users/password/:username",async(req,res)=>{
	try{
		const{username}=req.params;
		const{password}=req.body;
		const updateUser=await pool.query("update users set password=$1 where username=$2",[password,username])
		res.json("Password updated");
	}
	catch(e){
		console.error(e.message)
	}
})

//update user age

app.put("/users/age/:username",async(req,res)=>{
	try{
		const{username}=req.params;
		const{age}=req.body;
		const updateUser=await pool.query("update users set curr_age=$1 where username=$2",[age,username])
		res.json("Age updated");
	}
	catch(e){
		console.error(e.message)
	}
})

//update user income

app.put("/users/income/:username",async(req,res)=>{
	try{
		const{username}=req.params;
		const{income}=req.body;
		const updateUser=await pool.query("update users set income=$1 where username=$2",[income,username])
		res.json("Income updated");
	}
	catch(e){
		console.error(e.message)
	}
})

//update user expenses

app.put("/users/expenses/:username",async(req,res)=>{
	try{
		const{username}=req.params;
		const{expenses}=req.body;
		const updateUser=await pool.query("update users set expenses=$1 where username=$2",[expenses,username])
		res.json("Expenses updated");
	}
	catch(e){
		console.error(e.message)
	}
})

//delete user

app.delete("/users/:username",async(req,res)=>{
	try{
		const{username}=req.params;
		const deleteUser=await pool.query("Delete from users where username=$1",[username]);
		res.json("Account Deleted");
	}
	catch(e){
		console.error(e.message);
	}
})

//create assets

app.post("/assets/:ssn",async (req,res)=>{
	try{
		const{ssn}=req.params;
		const{name_asset}=req.body;
		const{value_asset}=req.body;
		const newAsset = await pool.query("INSERT INTO assets VALUES($1,$2,$3) RETURNING *",[ssn,name_asset,value_asset]);
		res.json(newAsset.rows);
	}
	catch(e){
		console.error(e.message);
	}
})

//view assets

app.get("/assets/:ssn",async (req,res)=>{
	try{
		const{ssn}=req.params;
		const listAssets= await pool.query("Select name_asset,value_asset from assets  where user_ssn=$1",[ssn]);
		res.json(listAssets.rows);
	}
	catch(err){
		console.error(err.message);
	}
})

//update assets value

app.put("/assets/:ssn",async(req,res)=>{
	try{
		const{ssn}=req.params;
		const{name_asset}=req.body;
		const{value_asset}=req.body;
		const changeAsset=await pool.query("UPDATE assets SET value_asset=$1 WHERE name_asset=$2 and user_ssn=$3",[value_asset,name_asset,ssn]);
		res.json("Asset Value Updated");
	}
	catch(err){
		console.error(err.message);
	}
})

//remove assets

app.delete("/assets/:ssn",async(req,res)=>{
	try{
		const{ssn}=req.params;
		const{name_asset}=req.body;
		const deleteAsset=await pool.query("Delete from assets where user_ssn=$1 and name_asset=$2",[ssn,name_asset]);
		res.json("Asset Deleted");
	}
	catch(e){
		console.error(e.message);
	}
})

//create debts

app.post("/debts/:ssn",async (req,res)=>{
	try{
		const{ssn}=req.params;
		const{name_debt}=req.body;
		const{price_debt}=req.body;
		const newDebt = await pool.query("INSERT INTO debts VALUES($1,$2,$3) RETURNING *",[ssn,name_debt,price_debt]);
		res.json(newDebt.rows);
	}
	catch(e){
		console.error(e.message);
	}
})

//view debts

app.get("/debts/:ssn",async (req,res)=>{
	try{
		const{ssn}=req.params;
		const listDebts= await pool.query("Select name_debt,price_debt FROM debts WHERE user_ssn=$1",[ssn]);
		res.json(listDebts.rows);
	}
	catch(err){
		console.error(err.message);
	}
})

//update debts price

app.put("/debts/:ssn",async(req,res)=>{
	try{
		const{ssn}=req.params;
		const{name_debt}=req.body;
		const{price_debt}=req.body;
		const changeDebt=await pool.query("UPDATE debts SET price_debt=$1 WHERE name_debt=$2 AND user_ssn=$3",[price_debt,name_debt,ssn]);
		res.json("Debt Price Updated");
	}
	catch(err){
		console.error(err.message);
	}
})

//remove debts

app.delete("/debts/:ssn",async(req,res)=>{
	try{
		const{ssn}=req.params;
		const{name_debt}=req.body;
		const deleteDebt=await pool.query("Delete from debts where user_ssn=$1 and name_debt=$2",[ssn,name_debt]);
		res.json("Debt Deleted");
	}
	catch(e){
		console.error(e.message);
	}
})

//create Email

app.post("/emails/:ssn",async (req,res)=>{
	try{
		const{ssn}=req.params;
		const{email_id}=req.body;
		const newEmail = await pool.query("INSERT INTO emails VALUES($1,$2) RETURNING *",[ssn,email_id]);
		res.json(newEmail.rows);
	}
	catch(e){
		console.error(e.message);
	}
})

//view emails

app.get("/emails/:ssn",async (req,res)=>{
	try{
		const{ssn}=req.params;
		const listEmails= await pool.query("Select email_id FROM emails WHERE user_ssn=$1",[ssn]);
		res.json(listEmails.rows);
	}
	catch(err){
		console.error(err.message);
	}
})

//remove email

app.delete("/emails/:ssn",async(req,res)=>{
	try{
		const{ssn}=req.params;
		const{email_id}=req.body;
		const deleteEmail=await pool.query("DELETE FROM emails WHERE user_ssn=$1 and email_id=$2",[ssn,email_id]);
		res.json("Email Deleted");
	}
	catch(e){
		console.error(e.message);
	}
})

app.listen(3000,()=>{
	console.log('Server has started on port 3000');
});

//Temporary check
app.get("/",(req,res) => {
	const allUsers= pool.query("Select * from users");
	res.json(allUsers.rows);
})