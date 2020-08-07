
const handleRegister=( req,res,db,bcrypt )=> {
    const {email,password,name}=req.body;

    if (!email || !password || !name)
    {
        return res.status(400).json("Invalid Credentials")
    }
    var hash = bcrypt.hashSync(password);
    db.transaction(trx=>
    {
        trx.insert({
            email:email,
            hash:hash
        })
        .into('login')
        .returning('email')
        .then(LoginEmail=>{
            return trx('users')
            .returning("*")
            .insert({
                name:name,
                email:LoginEmail[0],
                entries:0,
                joined:new Date(), 
            })
            .then(user=>{
                res.json(user[0])
            })      
        })
        .catch(err=>res.status(400).json("Unable to register"))
        .then(trx.commit)
        .then(trx.rollback)
    })
    .catch(err=>res.status(400).json("Unable to register"))
}

module.exports=
{
    handleRegister:handleRegister
}