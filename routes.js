const express=require('express')
const usersData=require('./Controllers/Contacts')
const Mainuser=require('./Controllers/Auth')
const router=express.Router();
const isAuthss=require('./Middleware/Auth')

router.post("/createContact",isAuthss,usersData.createContact)
router.get("/getUser",isAuthss,usersData.getUserdata)
router.post("/getallusers",isAuthss,usersData.getallusers)
router.post("/editUser",isAuthss,usersData.editUser)
router.post("/deleteUser",isAuthss,usersData.deleteuser)

 
router.post("/signup",Mainuser.signup)
router.post("/login",Mainuser.Login)
router.post("/verifyOtp",Mainuser.verifyOtp)
router.post("/forgotpassword",Mainuser.ForgotPassword)
router.post("/createPassword",Mainuser.CreatePassword)
module.exports = router