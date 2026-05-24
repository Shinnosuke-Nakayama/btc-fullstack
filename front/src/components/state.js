import { useState, useRef } from "react";

export const state = () => {
  const drawCanvas = useRef(null);
  const videoCanvas = useRef(null);
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0.0);
  const [duration, setDuration] = useState(0);
  const [check, setCheck] = useState(false);
  const [forcusX, setForcusX] = useState(100);
  const [forcusY, setForcusY] = useState(100);

  return {
    drawCanvas,
    videoCanvas,
    video,
    isPlaying,
    setIsPlaying,
    videoTime,
    setVideoTime,
    duration,
    setDuration,
    check,
    setCheck,
    forcusX,
    setForcusX,
    forcusY,
    setForcusY,
  };
};
