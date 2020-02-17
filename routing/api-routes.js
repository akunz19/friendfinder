var Bachelors = require("../app/data/bachelors");

module.exports = function(app) {
  app.get("/api/bachelors", function(req, res) {
    res.json(Bachelors);
  });

  app.post("/api/bachelors", function(req, res) {
    console.log(req.body);
    if (
      req.body.name != "" &&
      req.body.img != "" &&
      !req.body.scores.includes(NaN)
    ) {
      var newBachelor = req.body;
      var diffArray = [];
      var index;
      function getDifference() {
        for (var i = 0; i < Bachelors.length; i++) {
          var diffNumber = []; // holds the difference of scores
          for (var j = 0; j < Bachelors[i].scores.length; j++) {
            var difference = Math.abs(
              newBachelor.scores[j] - Bachelors[i].scores[j] // grabs the differences of the survey scores
            );
            diffNumber.push(difference); //pushes differenes of each score to diffarray
          }
          console.log(Bachelors[i]);
          function getSum(total, num) {
            //gets the sum of the array values
            return total + num;
          }
          var diffSum = diffNumber.reduce(getSum); //calculates the total difference
          diffArray.push(diffSum); //pushes total difference score for each user to array
          console.log("diffsum", diffSum, "diffArray", diffArray);
        }
        var min = Math.min(...diffArray); //grabs the lowest score
        console.log(min);
        index = diffArray.indexOf(min); //gets the index of the lowest score
        console.log("index", index);
      }
      getDifference();
      var match = Bachelors[index]; //assigns the match
      console.log("YOUR MATCH IS!!!", match);
      req.body.match = match;
      Bachelors.push(req.body);
      res.json(true);
      console.log("req.body", req.body.match);
    } else {
      res.json(false);
    }
  });
};
