var recommended = ["copper", "explain", "educated", "tenuous", "unite", "decisive", 
  "accidental", "chin", "mountain", "wholesale", "wound", "staking",
  "zephyr", "stir", "probable", "two"];
var tagged = [];

var hover = function(){
  console.log("hi");
  $(".tag").toggleClass("btn-outline-primary");
  $(".tag").toggleClass("btn-outline-danger");
};

var refreshRecommended = function(recommended) {
  var recContainer = $(".recommended");
  recContainer.empty();
  recommended.forEach(function(tag) {
    recContainer.append('<button type="button" class="tag btn btn-outline-primary"\
      onclick="tag(this.innerText)">' + tag + '</button>');
  });
};

var refreshTagged = function(tagged) {
  var taggedContainer = $(".tagged");
  taggedContainer.empty();
  tagged.forEach(function(tag) {
    taggedContainer.append('<button type="button" class="tag btn btn-outline-danger"\
      onclick="untag(this.innerText)">' + tag + '<i class="x fa fa-times"></i></button>');
  });
  // $(".tag").hover(
  //   function(){
  //     $(".tag").switchClass("btn-outline-primary","btn-outline-danger");
  //   },
  //  function(){
  //   $(".tag").switchClass("btn-outline-danger","btn-outline-primary");
  //  });
  $(".tag").hover(hover, hover);

};

var tag = function(text) {
  console.log(text);
  // add to tagged list
  tagged.push(text);
  // remove from recommended list
  var index = recommended.indexOf(text);
  if (index > -1) {
    recommended.splice(index, 1);
  }
  refreshRecommended(recommended);
  refreshTagged(tagged);
};

var untag = function(text) {
  // var text = element.innerText;
  console.log(text);
  // add to recommended list
  recommended.push(text);
  // remove from tagged list
  var index = tagged.indexOf(text);
  if (index > -1) {
    tagged.splice(index, 1);
  }
  refreshRecommended(recommended);
  refreshTagged(tagged);
};

refreshRecommended(recommended);
refreshTagged(tagged);
