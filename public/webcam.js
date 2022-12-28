"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  await handleGetModels();
  await handleGetFaceDescriptions();
});

// 훈련 모델 가져오기
const handleGetModels = async () => {
  const MODEL_URL = "/models";

  await faceapi.loadMtcnnModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);

  const video = document.getElementById("video");

  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.log(err),
  );
};

// 얼굴 인식 정보 처리하기
const handleGetFaceDescriptions = async () => {
  const mtcnnForwardParams = {
    // number of scaled versions of the input image passed through the CNN
    // of the first stage, lower numbers will result in lower inference time,
    // but will also be less accurate
    maxNumScales: 10,
    // scale factor used to calculate the scale steps of the image
    // pyramid used in stage 1
    scaleFactor: 0.709,
    // the score threshold values used to filter the bounding
    // boxes of stage 1, 2 and 3
    scoreThresholds: [0.6, 0.7, 0.7],
    // mininum face size to expect, the higher the faster processing will be,
    // but smaller faces won't be detected
    minFaceSize: 20,
    // limiting the search space to larger faces for webcam detection
    minFaceSize: 200,
  };

  const videoTag = document.getElementById("video");

  const mtcnnResults = await faceapi.mtcnn(videoTag, mtcnnForwardParams);
  const video = await faceapi.createCanvasFromMedia(videoTag);

  await faceapi.drawDetection(
    video,
    mtcnnResults.map((res) => res.faceDetection),
    { withScore: false },
  );

  await faceapi.drawLandmarks(
    video,
    mtcnnResults.map((res) => res.faceLandmarks),
    { lineWidth: 4, color: "red" },
  );
};
