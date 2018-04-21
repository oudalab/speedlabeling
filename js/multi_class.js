var recommended = ["copper", "explain", "educated", "tenuous", "unite", "decisive", 
  "accidental", "chin", "mountain", "wholesale", "wound", "staking",
  "zephyr", "stir", "probable", "two"];
var tagged = [];

// updates the recommended classes
var refreshRecommended = function() {
  var recContainer = $(".recommended");
  recContainer.empty();
  recommended.forEach(function(tag) {
    recContainer.append('<button type="button" class="tag btn btn-outline-primary"\
      onclick="tag(this.innerText)">' + tag + '</button>');
  });
};

// updates the selected classes
var refreshTagged = function() {
  var taggedContainer = $(".tagged");
  taggedContainer.empty();
  tagged.forEach(function(tag) {
    taggedContainer.append('<button type="button" class="tag remove-tag btn btn-outline-danger"\
      onclick="untag(this.innerText)">' + tag + '</button>');
  });
};

// updates the view based on the new data in the arrays
var refresh = function() {
  refreshRecommended();
  refreshTagged();
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
  refresh();
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
  refresh();
};

// adds input's val to the selected tags array
var onAdd = function(){
  var value = $(".new-tag").val();
  if(value == '') { return; }
  tagged.push(value);
  $(".new-tag").val("");
  refresh();
};

// bind an event to the input textbox
$('.new-tag').on('keypress', function (e) {
  if(e.which === 13) { // Enter key
    // Disable textbox to prevent multiple submit
    $(this).attr("disabled", "disabled");

    // add to selected tags array
    onAdd();

    //Enable the textbox again if needed.
    $(this).removeAttr("disabled");

    // return focus to input
    $(".new-tag").focus();
  }
});

var submit = function() {
  // TODO
  alert("Submitting " + tagged)
};

refresh();

