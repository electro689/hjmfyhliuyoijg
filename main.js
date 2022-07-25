song1="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;


function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("Imagine Dragons - Believer (Lyrics).mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialised");
}

function gotPoses(results) {
    if (results.length >0) {
        console.log(results);
        scoreLeft=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x ;
        leftwristY=results[0].pose.leftWrist.y ;
        console.log("leftwristX = "+leftwristX+" leftwristY = "+leftwristY);

        scorerightWrist=results[0].pose.keypoints[10].score;
        rightwristX=results[0].pose.rightWrist.x ;
        rightwristY=results[0].pose.rightWrist.y ;
        console.log("rightwristX = "+rightwristX+" rightwristY = "+rightwristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500)
    status1=song1.isPlaying()
    fill("red");
    stroke("red");
    if (scoreLeft>0.2){

        circle(leftwristX, leftwristY, 20)
        song2.stop()

        if (status1==false) {
            song1.play()
        }
    }

    status2=song2.isPlaying()
    if (scorerightWrist>0.2){

        circle(rightwristX, rightwristY, 20)
        song1.stop()

        if (status2==false) {
            song2.play()
        }
    }
}

function play() {
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}