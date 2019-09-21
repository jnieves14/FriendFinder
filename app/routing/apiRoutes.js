var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    for(var i = 0; i < req.body.scores.length; i++) {
      req.body.scores[i] = parseInt(req.body.scores[i]);
    }

    var bestFriend= 0;
    var minimumDifference = 40;

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(req.body.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < minimumDifference) {
        bestFriend = i;
        minimumDifference = totalDifference;
      }
    }
   
    friends.push(req.body);

    res.json(friends[bestFriend]);
  });
};