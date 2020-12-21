const path = require("path");
const express = require("express");
const router = express.Router();

const app = express();
var port = 25567;

app.use(express.static(path.join(__dirname, "client")));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + "/client/home.html"));
});

app.use("/", router);
app.listen(port);
console.log(`Started on port ${port}`);