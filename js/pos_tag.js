var map = {};
var toggle = function() {
  $(".img1").toggle();
  $(".img2").toggle();
};

var pos_text = 'The/AT grand/JJ jury/NN commented/VBD on/IN \
  a/AT number/NN of/IN other/AP topics/NNS ,/, among/IN them/PPO \
  the/AT Atlanta/NP and/CC Fulton/NP-tl County/NN-tl purchasing/VBG \
  departments/NNS which/WDT it/PPS said/VBD ``/`` are/BER well/QL \
  operated/VBN and/CC follow/VB generally/RB accepted/VBN practices/NNS \
  which/WDT inure/VB to/IN the/AT best/JJT interest/NN of/IN both/ABX \
  governments/NNS \'\'/\'\' ./.';

var pos_obj = [
  {word: 'The', pos: 'AT'}, {word: 'grand', pos: 'JJ'}, {word: 'jury', pos: 'NN'}, 
  {word: 'commented', pos: 'VBD'}, {word: 'on', pos: 'IN'},
  {word: 'a', pos: 'AT'}, {word: 'number', pos: 'NN'}, {word: 'of', pos: 'IN'}, 
  {word: 'other', pos: 'AP'}, {word: 'topics', pos:'NNS'}, {word: ',', pos: ','}, 
  {word: 'among', pos: 'IN'}, {word: 'them', pos: 'PPO'},
  {word:'the', pos:'AT'}, {word:'Atlanta', pos:'NP'}, {word:'and', pos:'CC'}, 
  {word:'Fulton', pos:'NP-tl'}, {word:'County', pos:'NN-tl'}, {word:'purchasing', pos:'VBG'},
  {word:'departments', pos:'NNS'}, {word:'which', pos:'WDT'}, {word:'it', pos:'PPS'}, 
  {word:'said', pos:'VBD'}, {word:'``', pos:'``'}, {word:'are', pos:'BER'}, 
  {word:'well', pos:'QL'}, {word:'operated', pos:'VBN'}, {word:'and', pos:'CC'}, 
  {word:'follow', pos:'VB'}, {word:'generally', pos:'RB'}, {word:'accepted', pos:'VBN'}, 
  {word:'practices', pos:'NNS'}, {word:'which', pos:'WDT'}, {word:'inure', pos:'VB'}, 
  {word:'to', pos:'IN'}, {word:'the', pos:'AT'}, {word:'best', pos:'JJT'}, 
  {word:'interest', pos:'NN'}, {word:'of', pos:'IN'}, {word:'both', pos:'ABX'},
  {word:'governments', pos:'NNS'}, {word:'``', pos:'``'}, {word:'.', pos:'.'}
];
var text = ''
var filter = 'NP';
pos_obj.forEach(function(obj) {
  if(obj.pos == filter){
    text += obj.word + '<span class="pos text-red"><b>/' + obj.pos + '</b></span> '
  } else { text += obj.word + ' ' }
  
});

$('#pos_tag').append(text);

// $('.tag-text').mouseup(getSelectionText);
$('.tag-text').mouseup(markSelection);

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    if(text == '') return;

    alert(text);
    return text;
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
        console.log("Left + Space");
        toggle();
        // TODO logic to submit labeling
      }  
    } else { 
      $('.no').removeClass('no-solid');
    }

    if(rightKeyDown) {
      $('.yes').addClass('yes-solid');

      if(spaceKeyDown) {
        console.log("Right + Space");
        toggle();
        // TODO logic to submit labeling
      }  
    } else { 
      $('.yes').removeClass('yes-solid');
    }
}

// find position of selected text
var markSelection = (function() {
  var markerTextChar = "\ufeff";
  var markerTextCharEntity = "&#xfeff;";

  var markerEl, markerId = "sel_" + new Date().getTime()
    + "_" + Math.random().toString().substr(2);

  console.log(markerEl);

  var selectionEl;

  return function() {
    var sel, range;

    if (document.selection && document.selection.createRange) {
      // Clone the TextRange and collapse
      range = document.selection.createRange().duplicate();
      range.collapse(false);

      // Create the marker element containing a single invisible character by 
      // creating literal HTML and insert it
      range.pasteHTML('<span id="' + markerId + '" style="position: relative;">'
        + markerTextCharEntity + '</span>');
      markerEl = document.getElementById(markerId);
    } else if (window.getSelection) {
      sel = window.getSelection();

      if (sel.getRangeAt) {
          range = sel.getRangeAt(0).cloneRange();
      } else {
          // Older WebKit doesn't have getRangeAt
          range = document.createRange();
          range.setStart(sel.anchorNode, sel.anchorOffset);
          range.setEnd(sel.focusNode, sel.focusOffset);

          // Handle the case when the selection was selected backwards 
          // (from the end to the start in the document)
          if (range.collapsed !== sel.isCollapsed) {
              range.setStart(sel.focusNode, sel.focusOffset);
              range.setEnd(sel.anchorNode, sel.anchorOffset);
          }
      }

      range.collapse(false);

      // Create the marker element containing a single invisible character 
      // using DOM methods and insert it
      markerEl = document.createElement("span");
      markerEl.id = markerId;
      markerEl.appendChild( document.createTextNode(markerTextChar) );
      range.insertNode(markerEl);
    }

    if (markerEl) {
      // Lazily create element to be placed next to the selection
      if (!selectionEl) {
          selectionEl = document.createElement("div");
          selectionEl.style.border = "solid darkblue 1px";
          selectionEl.style.backgroundColor = "lightgoldenrodyellow";
          selectionEl.innerHTML = "&lt;- selection";
          selectionEl.style.position = "absolute";

          document.body.appendChild(selectionEl);
      }

      // Find markerEl position http://www.quirksmode.org/js/findpos.html
      var obj = markerEl;
      var left = 0, top = 0;
      do {
          left += obj.offsetLeft;
          top += obj.offsetTop;
      } while (obj = obj.offsetParent);

      // Move the button into place.
      // Substitute your jQuery stuff in here
      selectionEl.style.left = left + "px";
      selectionEl.style.top = top + "px";
      alert(selectionEl.style);

      markerEl.parentNode.removeChild(markerEl);
    }
  };
})();
