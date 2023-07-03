"use strict";

const MODEL_URL = "/models";

const video = document.getElementById("video");

document.addEventListener("DOMContentLoaded", async () => {
  await playVideo();

  video.addEventListener("play", () => {
    // ### Creating a Canvas Element from an Image or Video Element
    const VideoCanvas = faceapi.createCanvasFromMedia(video);
    document.body.append(VideoCanvas);

    // ### Init configs
    const displayValues = {
      width: 640,
      height: 480,
    };

    // ### Resize media elements
    faceapi.matchDimensions(VideoCanvas, displayValues);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks() // detect landmark
        .withFaceDescriptors(); // detect descriptor around face

      // ### Input in to console result's detection
      // detections.map(console.log)

      const resizedDetections = faceapi.resizeResults(
        detections,
        displayValues
      );

      // ### Clear before picture
      VideoCanvas.getContext("2d").clearRect(
        0,
        0,
        VideoCanvas.width,
        VideoCanvas.height
      );

      // ### Drawing  in to VideoCanvas
      faceapi.draw.drawDetections(VideoCanvas, resizedDetections);
    }, 100);
  });
});

async function playVideo() {
  await faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    await faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    await faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    await faceapi.nets.faceExpressionNet.loadFromUri("./models");

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  video.srcObject = stream;
}
