module.exports = {
    userLogValidation: (req,res,next)=>{
        if(req.session.user){
            next()
        }else{
            res.redirect('/signin')
        }
    }
}