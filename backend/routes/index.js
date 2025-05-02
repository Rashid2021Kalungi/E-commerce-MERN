const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userSignInController=require("../controller/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailController = require("../controller/userDetails");

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailController)

module.exports = router;
