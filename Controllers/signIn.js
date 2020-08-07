
const signIn = (req,res,db,bcrypt)=>
{
   const {email,password}=req.body;

   if (!email || !password)
   {
       return res.status(400).json("Invalid Credentials")
   }
   
   db.select("email","hash")
   .from("login")
   .where('email','=',email)
   .then(data=>
    {
       const isValid = bcrypt.compareSync(password,data[0].hash);
       if (isValid)
       {
           return db('users')
           .returning("*")
           .where("email",'=',email)
           .then(data=>
            {
                res.json(data[0])
            })
            .catch(err=>res.status(400).json('Wrong Credentials'))
       }
       else
       {
        res.status(400).json('Wrong Credentials')
       }
    })
    .catch(err=>res.status(400).json('Wrong Credentials'))
}

module.exports=
{
    HandlesignIn:signIn
}