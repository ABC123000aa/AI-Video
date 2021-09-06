video = "";
itemsdetec = [];

function preload(){
video = createVideo("video.mp4");
video.hide()
}

function setup(){
    canvas = createCanvas(450, 350);
    canvas.center();
}

function draw(){
image(video, 0 ,0 ,450 ,350);
if (status != "")
{ 
    objectDetector.detect(video, gotResults);

    for(i = 0; i < itemsdetec.length; i++){
        document.getElementById("sta1us").innerHTML  =  "Status : Objects Detected";
        document.getElementById("number_tems").innerHTML = "Number Of Objects Detected Are : "+itemsdetec.length;
         r = random(255);
         g = random(255);
         b = random(255);
        fill(r, g, b);
    stroke(r ,g ,b);
    noFill();
    percentage = floor(itemsdetec[i].confidence * 100);
    text(itemsdetec[i].label+ "" +percentage+ "%", itemsdetec[i].x + 15, itemsdetec[i].y + 15);
    rect(itemsdetec[i].x, itemsdetec[i].y, itemsdetec[i].width, itemsdetec[i].heigth);

    }
}
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("sta1us").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.volume(0);
    video.rate(1);
}

function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    itemsdetec = results;
}