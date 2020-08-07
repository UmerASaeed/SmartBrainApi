const express=require('express');
const cors = require('cors');
const bcrypt=require('bcryptjs');
const register = require('./Controllers/register');
const signIn = require('./Controllers/signIn');
const getProfile = require('./Controllers/getProfile');
const UpdateScore = require('./Controllers/UpdateScore');
const app=express();

app.use(express.json())
app.use(cors())


var db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'pisces26',
      database : 'smart-brain'
    }
  });

app.get('/',(req,res)=>
{
    res.send("Server running")
})

app.post('/signin', (req,res) => {signIn.HandlesignIn(req,res,db,bcrypt) })

app.post('/register',(req,res) => { register.handleRegister(req,res,db,bcrypt) })

app.get('/profile/:id',(req,res) => { getProfile.UserProfile(req,res,db) })

app.put('/image',(req,res) => { UpdateScore.UpdateScore(req,res,db) })

app.listen(process.env.PORT || 3000,()=>
{
    console.log("App is running on port ${process.env.PORT}")
})