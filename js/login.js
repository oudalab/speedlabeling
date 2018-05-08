var inputString = "";
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
  var email = $('#inputEmail').val();
  sessionStorage.setItem('active_coder', email);

  // save label
  var label = $('#inputLabel').val();
  sessionStorage.setItem('label', label);

  // navigate to text.html
  window.location.href = './text.html';
}

$('#files').on('change', handleFileSelect);
