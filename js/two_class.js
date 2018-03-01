var map = {};
  var toggle = function() {
    $(".img1").toggle();
    $(".img2").toggle();
  };
  document.onkeydown = document.onkeyup = function(e){
      e = e || event; // to deal with IE
      map[e.keyCode] = e.type == 'keydown';

      spaceKeyDown = map[32];
      leftKeyDown = map[37];
      rightKeyDown = map[39];
      downKeyDown = map[40];

      if(leftKeyDown) {
        $(".my-left-col p").css("background-color", "#007bff");
        if(spaceKeyDown) {
          console.log("Left + Space");
          toggle();
          // TODO logic to submit labeling
        }  
      } else { $(".my-left-col p").css("background-color", "inherit"); }

      if(rightKeyDown) {
        $(".my-right-col p").css("background-color", "#007bff");
        if(spaceKeyDown) {
          console.log("Right + Space");
          toggle();
          // TODO logic to submit labeling
        }  
      } else { $(".my-right-col p").css("background-color", "inherit"); }

      if(downKeyDown) { 
        $(".junk p").css("background-color", "#ff3300");
        if(spaceKeyDown) {
          console.log("Down + Space");
          toggle();
          // TODO logic to submit labeling
        }
      } else { $(".junk p").css("background-color", "inherit"); }
  }