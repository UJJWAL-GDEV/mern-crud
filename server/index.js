const express = require('express');
const cors = require('cors');
const app = express();
const con = require('./db/config');
const Jwt = require('jsonwebtoken')
const keyJwt = 'student';
const port = 5000

app.use(express.json())
app.use(cors())

con.connect((err)=>{
    if(!err){
        console.log("Working")
    }
});

app.get('/students/', verifyToken,(req, res) => {
    con.query(`select * from Students `,(e,result)=>{
        if(result.length>0){
            res.send(result)
        }else{
            res.send({result:"No student(s) Available"})
        }  
    })
})



app.post('/addstudent', verifyToken,(req, res) => {
    const data = req.body;
    console.log(data)
    con.query('INSERT INTO Students SET ?',data, (e,result,fields)=>{
        if(!e){
            res.send(result);
        }else{

            console.log(e)
            
        }
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    con.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (err, results) => {
      if (err) {
        res.status(500).send('Error querying the database');
        return;
      }
  
      if (results.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        const user = results[0];
        const token = Jwt.sign({ user }, keyJwt); 
        res.status(200).json({ user, auth: token }); 
      }
    });
  });

  app.delete('/delete/:id',verifyToken,(req,res)=>{
    con.query('DELETE from Students where id='+req.params.id, (err, result)=>{
        if(err) throw err;
        res.send( result);
    })
})

app.get('/student/:id',verifyToken, (req, res) => {
    con.query(`select * from Students where id = ${req.params.id}`,(e,result)=>{
        if(result.length>0){
            res.send(result)
        }else{
            res.send({result:"No Student Available"})
        }  
    })
})

app.put('/update/:id',verifyToken,(req,res)=>{
    const data = [ req.body.name, req.body.email, req.body.course , req.params.id];
    console.log(data)
    con.query("UPDATE Students SET name = ?, email=?,course=? where id = ?", data, (err,result,fields)=>{
        if(err) {
            console.log(err)
        };
        if(result){
        res.send(result)
        }else{
            res.send({result:'student Update fails'})
        }
    })
})


function verifyToken (req,res,next){
    let token = req.headers.authorization;
    if(token){
        token = token.split(' ')[1];
        
        Jwt.verify(token,keyJwt,(err,valid)=>{
            if(valid) {
                next();}
            else {res.status(401).send({result:'Please send token to verify'})}
        })
    }else{
        res.status(403).send({result:'Please send token to verify'})
    }

}

app.listen(process.env.PORT || port)



