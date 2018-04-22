var friendData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res){
        var user = req.body;

        for(i=0; i<user.scores.length; i++){
            if(user.scores[i] == "1 (Strongly Disagree) "){
                user.scores[i] = 1;
            } else if (user.scores[i] == "5 (Strongly Agree)"){
                user.scores[i]=5;
            } else {
                user.scores[i] = parseInt(user.scores[i]);
            }
        }


        var differenceArr = [];

        for (i = 0; i <friendData.length; i++){
            var comparison = friendData[i];
            var difference = 0;

            for(i=0; i<comparison.scores.length; i++) {
                var questionDifference = Math.abs(comparison.scores[i]  - user.scores[i]);
                difference += questionDifference;
            }

            differenceArr[i]=difference;
        }

        var match = differenceArr[0];
        var matchIndex = 0;

        for (i=1; i<differenceArr.length ;i++) { 
            if (differenceArr[i] < match){
                match = differenceArr[i];
                matchIndex = i;
            }
        }

        friendData.push(user);

        res.json(friendData[matchIndex]);
    });
}