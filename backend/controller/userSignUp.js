const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user=await userModel.findOne({email})

    if(user){
        throw new Error("Email address already in use")
    }

    if (!email) {
      throw new Error("provide Email address");
    }
    if (!name) {
      throw new Error("provide your name");
    }
    if (!password) {
      throw new Error("password required");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("something went wrong");
    }

    const payload = {
      ...req.body,
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveData = userData.save();

    res.status(201).json({
        data: saveData,
        success: true,
        error: false,
        message: "user created successdully"
    });

  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignUpController;