var express = require("express");
var router = express.Router();
var userModel = require("../db_models/userModel");
var bcrypt = require("bcrypt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

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

router.get("/signin", (req, res, next) => {
  res.render("signin");
});

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

module.exports = router;
