// TODO catch error for missing multiLabel key in session storage
var map = {};
var docNum = 0;
var load_time = 0;
var dL = new DataLoader('multi');
var inputDocs = dL.inputDocs;
var recommended = [];
var tagged = [];
inputDocs.forEach(function() {
  // an array for each document, containing recommended and selected tags
  tagged.push([]); 
  recommended.push(dL.recommended.slice());
});

// updates the recommended classes
function refreshRecommended() {
  var recContainer = $(".recommended");
  recContainer.empty();
  recommended[docNum].forEach(function(tag) {
    recContainer.append('<button type="button" class="tag btn btn-outline-primary"\
      onclick="tag(this.innerText)">' + tag + '</button>');
  });
}

// updates the selected classes
function refreshTagged() {
  var taggedContainer = $(".tagged");
  taggedContainer.empty();
  tagged[docNum].forEach(function(tag) {
    taggedContainer.append('<button type="button" class="tag remove-tag btn btn-outline-danger"\
      onclick="untag(this.innerText)">' + tag + '</button>');
  });
}

// updates the view based on the new data in the arrays
function refresh() {
  refreshRecommended();
  refreshTagged();
}

// loads the specified document into the view
function reloadDoc(docNum) {
  if(docNum >= 0 && docNum < inputDocs.length) {
    var doc = inputDocs[docNum];
    $('.card-header').html(docNum+1 + ' / ' + inputDocs.length);
    $('#text').html(doc.text);
    load_time = Date.now();
    $('.download').hide();
    $('.submit-button').show();
  } 
  else if(docNum == inputDocs.length) {
    // show the download button
    $('.card-header').html('No more documents.');
    $('#text').html('');

    // show download section
    initDownloadBtn(dL.exportDocs())
    $('.download').show();
    $('.submit-button').hide();
  }
}

function next() {
  if(docNum < inputDocs.length) {
    reloadDoc(++docNum);
    refresh();
  }
}

function previous() {
  if(docNum > 0) {
    reloadDoc(--docNum);
    refresh();
  }
}

function submit(docNum, tags) {
  console.log(tags);
  var _input_hash = ""; // TODO
  var _task_hash = ""; // TODO
  dL.updateMultiLabel(docNum, tags, load_time, _input_hash, _task_hash);
  // clearTags();
  reloadDoc(docNum+1);
  refresh();
}

// function clearTags() {
//   // tagged = [];
//   // clear array to original recommended
//   recommended = dL.recommended.slice(); 
// }

// create the download button
function initDownloadBtn(text) {
  var exportFilename = 'export_' + Date.now() + '.json';
  var downloadLink = $('.download-btn');
  downloadLink.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  downloadLink.attr('download', exportFilename);
}

function tag(text) {
  // add to tagged list
  tagged[docNum].push(text);
  // remove from recommended list
  var index = recommended[docNum].indexOf(text);
  if (index > -1) {
    recommended[docNum].splice(index, 1);
  }
  refresh();
}

// move tag from selected to recommended lists
function untag(text) {
  // add to recommended list
  recommended[docNum].push(text);
  // remove from tagged list
  var index = tagged[docNum].indexOf(text);
  if (index > -1) {
    tagged[docNum].splice(index, 1);
  }
  refresh();
}

// adds input's val to the selected tags array
function onAdd(){
  var value = $(".new-tag").val();
  if(value == '') { return; }
  tagged[docNum].push(value);
  $(".new-tag").val("");
  refresh();
}

// adding a tag by pressing enter key in input
function onEnter(event) {
  if(event.key == 'Enter') {
    onAdd();
  }
}

document.onkeydown = document.onkeyup = function(e) {
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == 'keydown';

  jKeyDown = map[74];
  kKeyDown = map[75];
  shiftKeyDown = map[16];

  jKeyUp = e.keyCode == 74 && e.type == 'keyup';
  kKeyUp = e.keyCode == 75 && e.type == 'keyup';
  spaceKeyUp = e.keyCode == 32 && e.type == 'keyup';
  enterKeyUp = e.keyCode == 13 && e.type == 'keyup';

  if(jKeyDown) {
    $('.previous').addClass('previous-hover');
  } else { $('.previous').removeClass('previous-hover');}

  if(kKeyDown) {
    $('.next').addClass('next-hover');
  } else { $('.next').removeClass('next-hover');}

  if(jKeyUp) { previous(); }
  if(kKeyUp) { next(); }

  if(shiftKeyDown && enterKeyUp) {
    submit(docNum++, tagged[docNum]);
  }
}

$(function(){
  $('.navbar-text').html(dL.active_coder);
  $('.title').html('Topic: ' + dL.label);
  reloadDoc(docNum);
  refresh();
});
