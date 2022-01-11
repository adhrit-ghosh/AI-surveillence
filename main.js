status1="";
objectdetect="";
objects=[];
function preload(){
MyVideo = createVideo('video.mp4');
}

function setup(){
canvas = createCanvas(350,350);
canvas.center();
MyVideo.hide();

}

function draw(){
image(MyVideo,0,0,canvas.width,canvas.height);
if(status1==true){
objectdetect.detect(MyVideo,gotResult);
for(var i=0;i<objects.length;i++){
document.getElementById("number").innerHTML="Number of object detecting: "+objects.length;
document.getElementById("status").innerHTML="status:object Detected";
var percentage= Math.floor(objects[i].confidence*100)+" %";
var label_name=objects[i].label;
fill("red");
text(label_name + percentage,objects[i].x,objects[i].y);
noFill();
stroke("red");
rect(objects[i].x,objects[i].y,objects[i].length,objects[i].height);
}
}
}

function start(){
objectdetect = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded(){
    console.log('Model is Loaded');
    status1=true;
    MyVideo.loop();
MyVideo.volume(0);
MyVideo.speed(0.75);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
else{
    console.log(results);
objects=results;
}
}


