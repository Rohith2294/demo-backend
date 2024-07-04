const express=require('express')
const usersData=require('./Controllers/Contacts')
const Mainuser=require('./Controllers/Auth')
const router=express.Router();
const isAuthss=require('./Middleware/Auth')

router.post("/createContact",isAuthss,usersData.createContact)
router.post("/getContacts",isAuthss,usersData.getContacts)
router.post("/getallContactss",isAuthss,usersData.getallContactss)
router.post("/editContact",isAuthss,usersData.editContact)
router.post("/deleteContact",isAuthss,usersData.deleteContact)

 
router.post("/signup",Mainuser.signup)
router.post("/login",Mainuser.Login)
router.post("/verifyOtp",Mainuser.verifyOtp)
router.post("/forgotpassword",Mainuser.ForgotPassword)
router.post("/createPassword",Mainuser.CreatePassword)



module.exports = router