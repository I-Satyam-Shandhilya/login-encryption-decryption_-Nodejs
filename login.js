const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const users= []


app.get('/users',(req,resp)=>{
    resp.json(users)
})

app.post('/users',async (req,resp)=>{
    try{
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        const user = {name: req.body.name,password:req.body.password}
        users.push(user);
        resp.status(201).send()
    }
    catch{
        resp.status(500).send()
    }
})

app.post('/users/login',async(req,resp)=>{
    const user = users.find(user => user.name === req.body.name)
    if(user==null){
        return resp.status(400).send('Cannot find user')
    }
    try{
     if(await bcrypt.compare(req.body.password,user.password)){
        resp.send("login success")
     }
     else{
        resp.send("Not Allowed")
     }
    }
    catch{
        resp.status(500).send()
    }
})

app.listen(3000);