"use strict";

let fullFaceDescriptions;

document.addEventListener("DOMContentLoaded", async () => {
  await handleGetModels();
  await handleGetFaceDescriptions();
  await handleDrawDetections();
});

// 훈련 모델 가져오기
const handleGetModels = async () => {
  const MODEL_URL = "/models";

  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
};

// 얼굴 인식 정보 처리하기
const handleGetFaceDescriptions = async () => {
  const img = document.getElementById("img");
  const video = document.getElementById("video");

  fullFaceDescriptions = await faceapi
    .detectAllFaces(video)
    .withFaceLandmarks()
    .withFaceDescriptors();
};

// 디스플레이 사이즈 조정시 얼굴 박스 빛 윤곽 조정
const handleCorrespondImage = () => {
  fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions);
};

// 얼굴 박스 및 윤곽 그리기
const handleDrawDetections = async () => {
  const img = await faceapi.createCanvasFromMedia(
    document.getElementById("img"),
  );
  const video = await faceapi.createCanvasFromMedia(
    document.getElementById("video"),
  );
  const div = document.getElementById("div");
  div.append(video);

  video.style.position = "absolute";
  video.style.top = "0px";
  video.style.left = "0px";
  await faceapi.draw.drawDetections(video, fullFaceDescriptions);
  await faceapi.draw.drawFaceLandmarks(video, fullFaceDescriptions);
};
