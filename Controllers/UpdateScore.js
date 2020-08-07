 
const UpdateScore= (req,res,db)=>
{
    const {id}=req.body;
    db('users')
    .returning("*")
    .where({
        id:id
    })
    .increment('entries',1)
    .then(data=>
    {
        res.json(data[0].entries)
    })
    .catch(err=>res.status(400).json('Unable to get entries'))

}

module.exports=
{
    UpdateScore:UpdateScore
}