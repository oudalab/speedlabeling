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

document.onkeydown = document.onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    spaceKeyDown = map[32];
    leftKeyDown = map[37];
    rightKeyDown = map[39];
    downKeyDown = map[40];

    if(leftKeyDown) {
      // $(".my-left-col p").css("background-color", "#007bff");
      // $(".my-left-col p").addClass("blue");
      // $('.no').toggleClass('btn-outline-danger');
      // $('.no').toggleClass('btn-danger');
      $('.no').addClass('no-solid');

      // $('.no').switchClass('btn-outline-danger', 'btn-danger');

      if(spaceKeyDown) {
        console.log("Left + Space");
        toggle();
        // TODO logic to submit labeling
      }  
    } else { 
      $('.no').removeClass('no-solid');
      // $(".my-left-col p").css("background-color", "inherit");
      // $(".my-left-col p").removeClass("blue");
    }

    if(rightKeyDown) {
      // $(".my-right-col p").css("background-color", "#007bff");
      // $(".my-right-col p").addClass("blue");
      $('.yes').addClass('yes-solid');

      if(spaceKeyDown) {
        console.log("Right + Space");
        toggle();
        // TODO logic to submit labeling
      }  
    } else { 
      $('.yes').removeClass('yes-solid');
      // $(".my-right-col p").css("background-color", "inherit");
      // $(".my-right-col p").removeClass("blue");
    }
}