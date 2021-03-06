var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require("path");

var PORT = process.env.PORT || 8500





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//require route files 
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function(){
    console.log("listening on PORT: " + PORT);
});