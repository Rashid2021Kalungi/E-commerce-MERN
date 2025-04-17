const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router=require("./routes")

const connectDB = require("./config/db");




const app = express();
app.use(cors());
app.use(express.json())
app.use("/api",router)

const PORT = process.env.PORT || 8080;
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
})