module.exports = {
    userLogValidation: (req,res,next)=>{
        if(req.session.user){
            next()
        }else{
            console.log("Login required to access your account")
            res.redirect('/signin')
        }
    }
}