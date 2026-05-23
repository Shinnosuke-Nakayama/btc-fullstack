import { useState, useRef } from "react";

export const state = () => {
  const drawCanvas = useRef(null);
  const videoCanvas = useRef(null);
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0.0);
  const [duration, setDuration] = useState(0);
  const [check, setCheck] = useState(false);

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
  };
};
