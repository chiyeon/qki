const path = require("path");
const express = require("express");
const router = express.Router();

const app = express();
var port = 5000;

app.use(express.static(path.join(__dirname, "/client")));

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname + "/client/home.html"));
});

app.use("/", router);

app.set('port', process.env.PORT || 3000);
app.listen(port);
console.log(`Started on port ${port}`);