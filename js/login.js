var inputString = '';
var classType = '';

function addData(data) {
  inputString += data;
}
function saveData() {
  console.log(inputString);
  // save to session storage
  sessionStorage.setItem('jsonl_input', inputString);
}
function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var inputString = "";

  // Loop through the FileList
  var loadCounter = 0;
  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();
    reader.onload = function (e) {
      addData(e.target.result);
      if(++loadCounter >= files.length) {
        saveData();
      }
    };
    reader.readAsText(f);
  }
}
function submit() {
  // save email
  if(!classType) {
    alert('Please select the classification type.');
    return;
  }

  var email = $('#inputEmail').val();
  sessionStorage.setItem('active_coder', email);

  // save label
  var label = $('#inputLabel').val();
  sessionStorage.setItem('label', label);

  if(classType === 'binary') {
    var leftLabel = $('#leftLabel').val();
    sessionStorage.setItem('leftLabel', leftLabel);

    var downLabel = $('#downLabel').val();
    sessionStorage.setItem('downLabel', downLabel);

    var rightLabel = $('#rightLabel').val();
    sessionStorage.setItem('rightLabel', rightLabel);

    // navigate to text.html
    var validInput = email && label && leftLabel && downLabel && rightLabel;
    if(validInput) {
      window.location.href = './text.html';
    } else {
      alert('Please fill out all fields.');
    }
  } 
  else if (classType === 'multi') {
    var multiLabel = $('#multiLabel').val();
    sessionStorage.setItem('multiLabel', multiLabel);

    var validInput = email && label && multiLabel;
    if(validInput) {
      window.location.href = './multi_class.html';
    } else {
      alert('Please fill out all fields.');
    }
  }
}
function loadTagSection(type) {
  $('.tags').show();
  if(type === 'binary') {
    classType = 'binary';
    $('.class-picker').text('Binary');
    $('.multi').hide();
    $('.binary').show();
  }
  else {
    classType = 'multi';
    $('.class-picker').text('Multi');
    $('.binary').hide();
    $('.multi').show();
  }
}

$('#files').on('change', handleFileSelect);
