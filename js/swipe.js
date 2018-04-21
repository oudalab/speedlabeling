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
      // $(".my-left-col p").css("background-color", "#007bff");
      $(".my-left-col p").addClass("blue");
      if(spaceKeyDown) {
        console.log("Left + Space");
        toggle();
        // TODO logic to submit labeling
      }  
    } else { 
      // $(".my-left-col p").css("background-color", "inherit");
      $(".my-left-col p").removeClass("blue");
    }

    if(rightKeyDown) {
      // $(".my-right-col p").css("background-color", "#007bff");
      $(".my-right-col p").addClass("blue");
      if(spaceKeyDown) {
        console.log("Right + Space");
        toggle();
        // TODO logic to submit labeling
      }  
    } else { 
      // $(".my-right-col p").css("background-color", "inherit"); 
      $(".my-right-col p").removeClass("blue");
    }

    if(downKeyDown) { 
      // $(".junk p").css("background-color", "#ff3300");
      $(".junk p").addClass("red");

      if(spaceKeyDown) {
        console.log("Down + Space");
        toggle();
        // TODO logic to submit labeling
      }
    } else { 
      // $(".junk p").css("background-color", "inherit");
      $(".junk p").removeClass("red");
    }
}

// swipe functionality
$(function(){
  // Bind the swipeHandler callback function to the swipe event on div.box
  $(".tweet-wrapper").on("swipeleft", swipeHandlerLeft);
  $(".tweet-wrapper").on("swiperight", swipeHandlerRight);
  $(".tweet-wrapper").on("swipedown", swipeHandlerDown);

  // Callback function references the event target and adds the 'swipe' class to it
  function swipeHandlerLeft(event) {
    $(event.target).addClass("swipe-left");
    console.log("Swiped left!");
    // $(".my-left-col p").css("background-color", "#007bff");
    $(".my-left-col p").addClass("blue");

    setTimeout(function(){
      $(".swipe-left").remove();
      $(".tweet-wrapper").append('<img class="img1" src="./images/tweet.png" width="100%" />');
      // $(".my-left-col p").css("background-color", "inherit");
      $(".my-left-col p").removeClass("blue");
    }, 900);
  }
  function swipeHandlerRight(event) {
    $(event.target).addClass("swipe-right");
    console.log("Swiped right!");
    // $(".my-right-col p").css("background-color", "#007bff");
    $(".my-right-col p").addClass("blue");

    setTimeout(function(){
      $(".swipe-right").remove();
      $(".tweet-wrapper").append('<img class="img1" src="./images/tweet.png" width="100%" />');
      // $(".my-right-col p").css("background-color", "inherit");
      $(".my-right-col p").removeClass("blue");
    }, 900);
  }
  function swipeHandlerDown(event) {
    $(event.target).addClass("swipe-down");
    console.log("Swiped down!");
    alert("Swiped down");
    // $(".junk p").css("background-color", "#007bff");
    $(".junk p").addClass("red");

    setTimeout(function() {
      $(".swipe-down").remove();
      $(".tweet-wrapper").append('<img class="img1" src="./images/tweet.png" width="100%" />');
      // $(".junk p").css("background-color", "inherit");
      $(".junk p").removeClass("red");
    }, 900);
  }
});