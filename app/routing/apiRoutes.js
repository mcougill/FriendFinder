var friendData = require("../data/friends.js");

module.exports = function (app) {

    //API GET request
    app.get("/api/friends", function (req, res) {
        return res.json(friendData);
    });

    //API POST request
    app.post("/api/friends", function (req, res) {

        //Take result of user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        //calc difference between user's score and database scores
        var totalDifference = 0;



        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        };


        //iterate over friend list to calculate score difference 
        for (i = 0; i < friendData.length; i++) {

            totalDifference = 0;

            console.log(totalDifference);


            for (j = 0; j < friendData[i].scores[j]; j++) {

                //sum total difference
                totalDifference += Math.abs(parseInt(userScores[j] - parseInt(friendData[i].scores[j])));

                //compare scores for each friend
                if (totalDifference <= bestMatch.friendDifference) {

                    //make new match
                    bestMatch.name = friendData[i].name;
                    bestMatch.photo = friendData[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }


        //add new user
        friendData.push(userData);

        //return best match
        res.json(bestMatch);

    });

}