var path = require("path");

module.exports = function(app) {

    //when user hits url survey, show survey.html
    app.get("/survey", function(req,res){
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    //if url not survey, send to home page
    app.use(function(req,res){
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
} 