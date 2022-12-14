"use strict";

let fullFaceDescriptions;

document.addEventListener("DOMContentLoaded", async () => {
  await handleGetModels();
  await handleGetFaceDescriptions();

  handleDrawDetections();
});

const handleGetModels = async () => {
  const MODEL_URL = "/models";

  await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
  await faceapi.loadFaceLandmarkModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
};

const handleGetFaceDescriptions = async () => {
  const input = document.getElementById("video");
  fullFaceDescriptions = await faceapi
    .detectAllFaces(input)
    .withFaceLandmarks()
    .withFaceDescriptors();
};

const handleCorrespondImage = () => {
  fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions);
};

const handleDrawDetections = () => {
  //   const canvas = faceapi.createCanvasFromMedia(document.getElementById("img"));
  const video = faceapi.createCanvasFromMedia(document.getElementById("video"));
  const div = document.getElementById("div");
  div.append(video);

  video.style.position = "absolute";
  video.style.top = "0px";
  video.style.left = "0px";
  faceapi.draw.drawDetections(video, fullFaceDescriptions);
  faceapi.draw.drawFaceLandmarks(video, fullFaceDescriptions);
};
