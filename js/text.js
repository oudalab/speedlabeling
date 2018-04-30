/* 
*  This script is for front end logic
*  such as keylisteners and loading the view
*/

var map = {};
var docNum = 0;

function submit(docNum, answer) {
  var date = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
  var label = ""; // TODO
  var _input_hash = ""; // TODO
  var _task_hash = ""; // TODO
  updateLabel(docNum, date, label, answer, _input_hash, _task_hash);
  reloadDoc(docNum+1);
}

// load document specified into the labeler
function reloadDoc(docNum) {
  if(docNum < inputDocs.length) {
    var doc = inputDocs[docNum];
    $('.card-header').html(docNum+1 + ' / ' + inputDocs.length);
    $('#pos_tag').html(doc.text);
    outputDocs[docNum].load_time = Date.now();
  } else {
    $('.card-header').html('No more documents.');
    $('#pos_tag').html('');
    $('.label-row').toggle(); // hide buttons
  }
}

document.onkeydown = document.onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    spaceKeyDown = map[32];
    leftKeyDown = map[37];
    rightKeyDown = map[39];
    downKeyDown = map[40];

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
}

reloadDoc(docNum);