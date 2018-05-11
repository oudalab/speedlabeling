/* 
*  This script is for front end logic
*  such as keylisteners and loading the view
*/

var map = {};
var docNum = 0;
var load_time = 0;
var dL = new DataLoader('trinary');
var inputDocs = dL.inputDocs;

function submit(docNum, answer) {
  var _input_hash = ""; // TODO
  var _task_hash = ""; // TODO
  dL.updateTrinaryLabel(docNum, answer, load_time, _input_hash, _task_hash);
  reloadDoc(docNum+1);
}
function initDownloadBtn(text) {
  var exportFilename = 'export_' + Date.now() + '.json';
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
    load_time = Date.now();
    $('.label-row').show();
    $('.download').hide();
  } 
  else if(docNum == inputDocs.length) {
    $('.card-header').html('No more documents.');
    $('#pos_tag').html('');
    $('.label-row').toggle(); // hide buttons

    // show download section
    initDownloadBtn(dL.exportDocs())
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
      $('.btn-left').addClass('btn-left-solid');

      if(spaceKeyDown) {
        // Left + Space
        if(docNum < inputDocs.length){
          submit(docNum++, dL.leftLabel);
        }
      }  
    } else { $('.btn-left').removeClass('btn-left-solid'); }


    if(rightKeyDown) {
      $('.btn-right').addClass('btn-right-solid');

      if(spaceKeyDown) {
        // Right + Space
        if(docNum < inputDocs.length){
          submit(docNum++, dL.rightLabel);
        }
      }  
    } else { $('.btn-right').removeClass('btn-right-solid'); }


    if(downKeyDown) {
      $('.btn-down').addClass('btn-down-solid');

      if(spaceKeyDown) {
        // Down + Space
        if(docNum < inputDocs.length){
          submit(docNum++, dL.downLabel);
        }
      }  
    } else { $('.btn-down').removeClass('btn-down-solid'); }

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
  $('.navbar-text').html(dL.active_coder);
  $('.title').html('Topic: ' + dL.label);
  $('.btn-left').text(dL.leftLabel);
  $('.btn-down').text(dL.downLabel);
  $('.btn-right').text(dL.rightLabel);

  $('.tip-left').text(' : ' + dL.leftLabel);
  $('.tip-down').text(' : ' + dL.downLabel);
  $('.tip-right').text(' : ' + dL.rightLabel);

  reloadDoc(docNum);
});