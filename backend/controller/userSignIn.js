const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("provide your email");
    }
    if (!password) {
      throw new Error("password required");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    // console.log("checkpassword",checkPassword)

    if (checkPassword) {
        const tokenData={
            _id: user._id,
            email: user.email
        }
      const token = await jwt.sign(
        tokenData,
        process.env.TOKEN_SECRET_KEY,

        {
          expiresIn: 60 * 60 *8,
        }
      );
      const tokenOption = {
        httpOnly: true,
        secure: false, // Set to true only in production over HTTPS
        sameSite: "Lax", // Helps with cross-origin cookie sharing
      };

      res.cookie("token",token,tokenOption).json({
        message: "Login successfully",
        data:token,
        success: true,
        error: false
      })
    } else {
      throw new Error("Incorrect login Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
