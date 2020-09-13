//Dependencies
const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(cors());

//Testing
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Testin Proxy GET"
    });
})

//Routes
const testRoute = require("./api/routes/testRoute.js");
app.use("/api/test", testRoute);

//SPA Production
if(process.env.NODE_ENV === "production"){
    app.use(express.static(__dirname + "/public/"));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "public/index.html");
    })
}


//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
})