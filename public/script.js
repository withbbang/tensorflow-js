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
  const input = document.getElementById("img");
  fullFaceDescriptions = await faceapi
    .detectAllFaces(input)
    .withFaceLandmarks()
    .withFaceDescriptors();
};

const handleCorrespondImage = () => {
  fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions);
};

const handleDrawDetections = () => {
  const canvas = document.getElementById("canvas");
  faceapi.draw.drawDetections(canvas, fullFaceDescriptions);
};
