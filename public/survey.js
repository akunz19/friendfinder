  var score;
  var match;
  var name = $(".name")[0];
  var imgurl = $(".imgurl")[0];
  var bachelorModal = $("#displayChosenBachelor");
  var modalH5 = $("#exampleModalLongTitle");

  $("#submit").click(function(event){
      event.preventDefault();
      var newBachelor = { //user object
          name: $("#name").val().trim(),
          image: $("#imgurl").val().trim(),
          scores: [],
          match: match
      };

      function getScores(){ //gets the scores from questions
          $.each($(".custom-select option:selected"), function(){
          var answers = parseInt($(this).val()); 
          console.log("eachoop"); 
          newBachelor.scores.push(answers);
          if(answers === NaN){
            console.log("if statement");
          throwError();
          };
      });
      };
      getScores();
      $.post("/api/bachelors", newBachelor,
      function(data) {

      if (data) {
        console.log("success");
        runBachelorQuery();
      }

      else {
        throwError();
      };

      $("#name").val("");
      $("#imgurl").val("");
      // $(".custom-select").val("");
    });


    function runBachelorQuery() {
      
$.ajax({ url: "/api/bachelors", data: newBachelor, method: "GET" })
.then(function(Bachelors) {
  var index = Bachelors.length - 1;
  console.log(Bachelors[index].match);
  var myMatch = Bachelors[index].match;
  console.log("------------------------------------");
  modalH5.text("Your Match:")
  bachelorModal.append("<h2>"+myMatch.name+"</h2>")
  bachelorModal.append("<img src='"+myMatch.image+"' class='img-fluid rounded float-left' alt='chris harrison'>");
  
  });
};


      console.log("myscores", newBachelor.scores);

    function throwError(){
        modalH5.text("Error!")
        bachelorModal.append("<h2>Please fill out all fields</h2>");
    };

  });

  $("#modalclose").on("click", function(event){
    event.preventDefault();
    modalH5.text("");
    bachelorModal.empty();
    return 0;
  });
