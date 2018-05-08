var recommended = ["copper", "explain", "educated", "tenuous", "unite", "decisive", 
  "accidental", "chin", "mountain", "wholesale", "wound", "staking",
  "zephyr", "stir", "probable", "two"];
var tagged = [];

// updates the recommended classes
function refreshRecommended() {
  var recContainer = $(".recommended");
  recContainer.empty();
  recommended.forEach(function(tag) {
    recContainer.append('<button type="button" class="tag btn btn-outline-primary"\
      onclick="tag(this.innerText)">' + tag + '</button>');
  });
}

// updates the selected classes
function refreshTagged() {
  var taggedContainer = $(".tagged");
  taggedContainer.empty();
  tagged.forEach(function(tag) {
    taggedContainer.append('<button type="button" class="tag remove-tag btn btn-outline-danger"\
      onclick="untag(this.innerText)">' + tag + '</button>');
  });
}

// updates the view based on the new data in the arrays
function refresh() {
  refreshRecommended();
  refreshTagged();
}

function tag(text) {
  console.log(text);
  // add to tagged list
  tagged.push(text);
  // remove from recommended list
  var index = recommended.indexOf(text);
  if (index > -1) {
    recommended.splice(index, 1);
  }
  refresh();
}

function untag(text) {
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
}

// adds input's val to the selected tags array
function onAdd(){
  var value = $(".new-tag").val();
  if(value == '') { return; }
  tagged.push(value);
  $(".new-tag").val("");
  refresh();
}

// adding a tag by pressing enter key in input
function onEnter(event) {
  if(event.key == 'Enter') {
    onAdd();
  }
}

function submit() {
  // TODO
  alert("Submitting " + tagged);
  location.reload();
}

document.onkeyup = function(e) {
  var code = e.keyCode ? e.keyCode : e.which;
  // check if space key pressed and focus is not on the input
  if (code === 32 && !$(".new-tag").is(":focus")) {
      submit();
  }
}

refresh();

