objects = [];
video = "";
status1 = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("status").innerHTML = objects.length + " objects are detected";
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    video.loop()
    video.speed(1);
    video.volume(0);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
    }
    objects = result;
}