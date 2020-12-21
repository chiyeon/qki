const path = require("path");
const express = require("express");
const router = express.Router();

const app = express();

app.use(express.static(path.join(__dirname, "/client")));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + "/client/home.html"));
});

app.use("/", router);

var port = process.env.PORT || 5000;

app.set('port', port);
app.listen(port);
console.log(`Started on port ${port}`);