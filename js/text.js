/* 
*  This script is for front end logic
*  such as keylisteners and loading the view
*/

var map = {};
var docNum = 0;

function submit(docNum, answer) {
  var date = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
  // var label = ""; // TODO
  var _input_hash = ""; // TODO
  var _task_hash = ""; // TODO
  updateLabel(docNum, date, label, answer, _input_hash, _task_hash);
  reloadDoc(docNum+1);
}

function initDownloadBtn(text) {
  var exportFilename = 'export_' + Date.now() + '.jsonl';
  var downloadLink = $('.download-btn');
  downloadLink.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  downloadLink.attr('download', exportFilename);
}
// load document specified into the labeler
function reloadDoc(docNum) {
  if(docNum >= 0 && docNum < inputDocs.length) {
    var doc = inputDocs[docNum];
    $('.card-header').html(docNum+1 + ' / ' + inputDocs.length);
    $('#pos_tag').html(doc.text);
    outputDocs[docNum].load_time = Date.now();
    $('.label-row').show();
    $('.download').hide();
  } else if(docNum == inputDocs.length) {
    $('.card-header').html('No more documents.');
    $('#pos_tag').html('');
    $('.label-row').toggle(); // hide buttons

    // show download section
    initDownloadBtn(exportDocs())
    $('.download').show();
  }
}

function next() {
  if(docNum < inputDocs.length) {
    reloadDoc(++docNum);
  }
}

function previous() {
  if(docNum > 0) {
    reloadDoc(--docNum);
  }
}

document.onkeydown = document.onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    spaceKeyDown = map[32];
    leftKeyDown = map[37];
    rightKeyDown = map[39];
    downKeyDown = map[40];
    jKeyDown = map[74];
    kKeyDown = map[75];

    jKeyUp = e.keyCode == 74 && e.type == 'keyup';
    kKeyUp = e.keyCode == 75 && e.type == 'keyup';

    if(leftKeyDown) {
      $('.no').addClass('no-solid');

      if(spaceKeyDown) {
        // Left + Space
        if(docNum < inputDocs.length){
          submit(docNum++, "reject");
        }
      }  
    } else { $('.no').removeClass('no-solid'); }


    if(rightKeyDown) {
      $('.yes').addClass('yes-solid');

      if(spaceKeyDown) {
        // Right + Space
        if(docNum < inputDocs.length){
          submit(docNum++, "accept");
        }
      }  
    } else { $('.yes').removeClass('yes-solid'); }


    if(downKeyDown) {
      $('.down').addClass('down-solid');

      if(spaceKeyDown) {
        // Down + Space
        if(docNum < inputDocs.length){
          submit(docNum++, "n/a");
        }
      }  
    } else { $('.down').removeClass('down-solid'); }

    if(jKeyDown) {
      $('.previous').addClass('previous-hover');
    } else { $('.previous').removeClass('previous-hover');}

    if(kKeyDown) {
      $('.next').addClass('next-hover');
    } else { $('.next').removeClass('next-hover');}

    if(jKeyUp) { previous(); }
    if(kKeyUp) { next(); }

    if(e.keyCode == 32) { e.preventDefault(); }
}

$(function(){
  // load active coder
  $('.navbar-text').html(active_coder);
  $('.title').html('Topic: ' + label);
  reloadDoc(docNum);
});