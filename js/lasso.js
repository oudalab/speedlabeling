var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');
var img = document.createElement('IMG');

var savedOptions;
var myCanv;
var imgInstance;

img.onload = function() {
    myCanv = new fabric.Canvas('c', {
        isDrawingMode: true
    });

    imgInstance = new fabric.Image(img, {
        left: 0,
        top: 0,
    });
    myCanv.add(imgInstance);

    myCanv.freeDrawingBrush.color = "red";
    myCanv.freeDrawingBrush.width = 4;

    myCanv.on('path:created', function(options) {
        savedOptions = options;
        $('#confirm-menu').toggle();

        // test
        var path = savedOptions.path;
        // console.log(path.path)
        myCanv.isDrawingMode = false;
        myCanv.remove(imgInstance);
        myCanv.remove(path);
        // console.log(myCanv.canvas);
        myCanv.clipTo = function(ctx) {
            console.log(ctx);
            path.render(ctx);
        };
        myCanv.renderAll();
        myCanv.add(imgInstance);
        // alert(path.path)
    });
}

$('.yes').click(function(){
    // hide menu
    $('#confirm-menu').toggle();
    // var path = savedOptions.path;
    // console.log(path.path)
    // myCanv.isDrawingMode = false;
    // myCanv.remove(imgInstance);
    // myCanv.remove(path);
    // myCanv.clipTo = function(ctx) {
    //     path.render(ctx);
    // };
    // myCanv.add(imgInstance);
    // alert(path.path)
});

$('.no').click(function(){
    // hide menu
    $('#confirm-menu').toggle();
    // myCanv.remove(savedOptions.path);

    // test 
    // myCanv.isDrawingMode = false;
    // myCanv.remove(imgInstance);
    // myCanv.remove(savedOptions.path);
    // myCanv.clear();
    // imgInstance = new fabric.Image(img, {
    //     left: 0,
    //     top: 0,
    // });
    // myCanv.add(imgInstance);
});

img.src = "http://upload.wikimedia.org/wikipedia/commons/3/33/Jbassette4.jpg?uselang=fi";