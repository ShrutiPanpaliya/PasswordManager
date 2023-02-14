const express = require("express");
const app = express();
const PORT=3002;
const mysql = require('mysql');
const cors=require('cors')
const {encrypt,decrypt}=require('./EncryptionHandler')
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    connectionLimit:100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'passwordmanager'
    
}
);
app.post("/addingpass",(req,res)=>
{
    const {password,title}=req.body
    const hashPass=encrypt(password)
    db.query("INSERT INTO passwords (password,title,iv) values (?,?,?)",[hashPass.password,title,hashPass.iv],(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});
app.get("/showpass",(req,res)=>{
 db.query("SELECT * FROM passwords",(err,result)=>
 {
    if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
 })
});
app.post("/decryptpass",(req,res)=>{
    res.send(decrypt(req.body))
}
)
app.listen(PORT,()=>
{
 console.log("Server is running");
});
