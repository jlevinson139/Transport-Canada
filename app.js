var express = require("express");
var path = require("path");
var routes = require("./routes");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var app = express();



app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use('/public', express.static(__dirname + "/public"))
app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})
