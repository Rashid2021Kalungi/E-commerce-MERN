const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers["authorization"];

    if (!token) {
      return res.json({
        message: "User not logged in",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("Error in auth", err);
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      console.log("Decoded:", decoded);
      req.userId = { id: decoded?._id };

      next();
    });

    console.log("Token -", token);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      data: [],
      success: false,
    });
  }
}

module.exports = authToken;
