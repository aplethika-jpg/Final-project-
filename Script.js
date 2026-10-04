const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

const statusBox = document.getElementById("status");
const eyeStatus = document.getElementById("eyeStatus");
const blinkCount = document.getElementById("blinkCount");
const sessionTime = document.getElementById("sessionTime");

let cameraStream = null;
let seconds = 0;
let timer = null;

// Start Camera
startBtn.addEventListener("click", function () {

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(function (stream) {

        cameraStream = stream;

        video.srcObject = stream;

        statusBox.innerText = "Camera Active";
        eyeStatus.innerText = "Eye Monitoring Active";
        blinkCount.innerText = "0";

        startBtn.disabled = true;
        stopBtn.disabled = false;

        seconds = 0;
        sessionTime.innerText = "00:00";

        timer = setInterval(function () {

            seconds++;

            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;

            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if (remainingSeconds < 10) {
                remainingSeconds = "0" + remainingSeconds;
            }

            sessionTime.innerText =
                minutes + ":" + remainingSeconds;

        }, 1000);

    })
    .catch(function (error) {

        statusBox.innerText = "Camera Permission Denied";
        eyeStatus.innerText = "Camera Unavailable";

        console.log(error);

        alert("Please allow camera permission.");

    });

});


// Stop Camera
stopBtn.addEventListener("click", function () {

    if (cameraStream) {

        cameraStream.getTracks().forEach(function (track) {
            track.stop();
        });

    }

    cameraStream = null;

    video.srcObject = null;

    statusBox.innerText = "Camera Stopped";
    eyeStatus.innerText = "Waiting...";

    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(timer);

});
