var express = require("express");
var router = express.Router();
var userModel = require("../db_models/userModel");
var bcrypt = require("bcrypt");
var objectId = require("mongodb").ObjectId

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


//signup ge request
router.get("/signup", function (req, res, next) {
  res.render("signup");
});


//signup post request
router.post("/signup", async (req, res) => {
  //adding data to varibales
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let passwd = req.body.passwd;

  //encrypting password
  const hashedPasswd = await bcrypt.hash(passwd, 12);
  //creating usermodel
  const user = new userModel({
    name: name,
    email: email,
    phone: phone,
    passwd: hashedPasswd,
  });

  try {
    //uploading data to db
    const userToDb = await user.save();
    res.status(201).json({
      message: userToDb,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//signin get request
router.get("/signin", (req, res, next) => {
  console.log("rendering signin page")
  res.render("signin");
});


//signin post request
router.post("/signin", async (req, res) => {
  //getting login informatins
  const loginEmail = req.body.email;
  const loginPassword = req.body.passwd;

  //getting user informations using email
  const userInfo = await userModel.findOne({ email: loginEmail });

  if (!userInfo) {
    res.status(500).json({ message: "user not found" });
  } else {
    //comparing encrypted password and login password
    const userPassword = await bcrypt.compare(loginPassword, userInfo.passwd).then((passwordStatus) => {
        //authentication success password and email matched
        if (passwordStatus) {
          res.status(201).json({
            message: "login sucessfull",
            data: userInfo,
          });
        } else {
          //password not matched or entered incorrect
          res.status(500).json({ message: "incorrect password" });
        }
      });
  }
});


router.get('/userProfile/:id', (req,res)=>{
  let userId = req.params.id;
  let userData = userModel.findById(userId).then((data)=>{
    console.log(data)
    res.render('view-profile', {data})
  })
})




//edit profile get request (id passed in query)
router.get('/editProfile/', (req,res)=>{
  const userId = req.query.id;
  
    let userData = userModel.findById(userId).then((data)=>{
      console.log(data)
      res.render('edit-profile', {data})
    })
})


//edit profile post request 
router.post('/editProfile/:id', (req,res)=>{
    let userId = req.params.id;
    console.log(userId)
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const userData = userModel.findById(userId).then((data)=>{
        if(!data){
            res.status(501).json({
                message:"post is not available"
            })
        }//checking id exist

        data.name = name; //updating title to database 
        data.email = email; //updating authorname to database
        data.phone = phone  //updating content to database
        return data.save();   //saving changes to databse
    }).then((result)=>{
        res.status(200).json({
            message:"post edited sucessfully",
            data: result
        })
    }).catch((err)=>{
        console.log(err)
    })
})
 

//delete account! (id sent by query)
router.post('/userProfile/deleteAccount6ty5', (req,res)=>{
  let userId = req.query.id;
  console.log(userId) 
    const user = userModel.findById(userId).then(async(accountToDelete)=>{
      console.log(accountToDelete)
        if(!accountToDelete){
            res.status(501).json({
                message:"post not found"
            })
        }
        return await userModel.deleteOne(objectId(accountToDelete));

    }).then((account)=>{
        res.status(200).json({
            message:"account deleted successfully",
            account: account
        })
    }).catch((err)=>{
        console.log(err) 
    })
});



module.exports = router; 
