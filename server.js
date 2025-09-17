const express=require('express');
const sqlite3=require('sqlite3').verbose();
const bodyParser=require('body-parser');
const path=require('path');
const app=express();const PORT=process.env.PORT||3000;

// DB
const db=new sqlite3.Database('db.sqlite3');
db.serialize(()=>{
 db.run("CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
 db.run("CREATE TABLE IF NOT EXISTS schemes (id INTEGER PRIMARY KEY, title TEXT, description TEXT)");
 db.run("CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY, name TEXT, role TEXT)");
 db.run("CREATE TABLE IF NOT EXISTS complaints (id INTEGER PRIMARY KEY, name TEXT, mobile TEXT, msg TEXT)");
 db.get("SELECT * FROM admin WHERE username=?",["garaj22"],(err,row)=>{
  if(!row){db.run("INSERT INTO admin (username,password) VALUES (?,?)",["garaj22","india@11"]);}
 });
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Complaint API
app.post('/api/complaint',(req,res)=>{
 const {name,mobile,msg}=req.body;
 db.run("INSERT INTO complaints (name,mobile,msg) VALUES (?,?,?)",[name,mobile,msg]);
 res.json({success:true});
});

app.listen(PORT,()=>console.log('Server running on '+PORT));
