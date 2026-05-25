import { useEffect, useRef, useState, useContext } from "react";
import "./video.css";

import {
  Text,
  IconButton,
  PlayIcon,
  PauseIcon,
  Slider,
  Checkbox,
  VStack,
} from "@yamada-ui/react";

import { Context } from "../App";

export function VideoScreen() {
  const globalState = useContext(Context);
  let forcusData;

  useEffect(() => {
    // let num = Math.floor(Math.random() * 6) + 1;
    // fetch(`/editdata/${num}`)
    //   .then((res) => res.json())
    //   .then((res) => globalState.setEditData((editData) => res.result.data));
    // // ここは閲覧時なのか、追加時なのかで切り替える
    // globalState.setVideoSrc((videoSrc) => globalState.editData.contents_path);
    forcusData = {
      start: globalState.editData[0].focus_start_time,
      end: globalState.editData[0].focus_end_time,
      x: globalState.editData[0].focus_point_x,
      y: globalState.editData[0].focus_point_y,
    };
    globalState.setVideoSrc((src) => globalState.editData[0].contents_path);
  }, []);

  function handleClick() {
    const nextIsPlaying = !globalState.isPlaying;
    globalState.setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      globalState.video.current.play();
    } else {
      globalState.video.current.pause();
    }
  }

  useEffect(() => {
    if (globalState.check) return;
    const dCanvas = globalState.drawCanvas.current;
    const context = dCanvas.getContext("2d");
    if (
      !(
        forcusData.start < globalState.videoTime &&
        globalState.videoTime < forcusData.end
      )
    ) {
      const canvas = globalState.drawCanvas.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [globalState.editData]);

  useEffect(() => {
    const timer = setInterval(function () {
      const vCanvas = globalState.videoCanvas.current;
      const videoImg = globalState.video.current;
      const dCanvas = globalState.drawCanvas.current;
      const context = dCanvas.getContext("2d");
      vCanvas.getContext("2d").drawImage(videoImg, 0, 0, 500, 300);

      globalState.setVideoTime((videoTime) => {
        if (globalState.check) return globalState.video.current.currentTime;
        if (forcusData.start < videoTime && videoTime < forcusData.end) {
          context.clearRect(0, 0, vCanvas.width, vCanvas.height);
          context.lineWidth = 8; //線の太さを変える
          context.strokeStyle = "#ff0000";
          context.beginPath();
          context.arc(200, 200, 50, 0, Math.PI * 2, false);
          context.stroke();
        } else if (videoTime >= forcusData.end) {
          const canvas = globalState.drawCanvas.current;
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        return globalState.video.current.currentTime;
      });
    }, 1000 / 30);
    return () => {
      clearInterval(timer);
    };
  }, [globalState.check]);

  useEffect(() => {
    let isDragging = false;
    let dragStartPoint = null;

    const canvas = globalState.drawCanvas.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let circleOrigin = { x: globalState.forcusX, y: globalState.forcusY }; //

    function draw(paramcircleOrigin) {
      if (!canvas) return;
      if (!context) return;

      const curcircleOrigin = paramcircleOrigin
        ? paramcircleOrigin
        : circleOrigin;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = 8; //線の太さを変える
      context.strokeStyle = "#ff0000";
      context.beginPath();
      context.arc(
        curcircleOrigin.x,
        curcircleOrigin.y,
        50,
        0,
        Math.PI * 2,
        false,
      );
      context.stroke();
    }

    function reset() {
      const canvas = globalState.drawCanvas.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    globalState.check ? draw() : reset();

    function getcircleOriginDragging(curpointerPos) {
      if (!isDragging) return;
      if (!dragStartPoint) return;

      return {
        x: circleOrigin.x + (curpointerPos.x - dragStartPoint.x),
        y: circleOrigin.y + (curpointerPos.y - dragStartPoint.y),
      };
    }

    function handlepointerDown(event) {
      // ドラッグ開始
      isDragging = true;
      dragStartPoint = { x: event.clientX, y: event.clientY };
    }

    function handlepointerMove(event) {
      // ドラッグ中
      if (!isDragging) return;
      const movingcircleOrigin = getcircleOriginDragging({
        x: event.clientX,
        y: event.clientY,
      });
      if (!movingcircleOrigin) return;

      globalState.setForcusX((x) => movingcircleOrigin.x);
      globalState.setForcusY((y) => movingcircleOrigin.y);

      // 描画
      draw(movingcircleOrigin);
    }

    function handlepointerUp(event) {
      // ドラッグ終了
      const finalcircleOrigin = getcircleOriginDragging({
        x: event.clientX,
        y: event.clientY,
      });
      if (!finalcircleOrigin) return;

      circleOrigin = finalcircleOrigin;

      isDragging = false;
      dragStartPoint = null;
    }

    canvas.addEventListener("pointerdown", handlepointerDown);
    canvas.addEventListener("pointermove", handlepointerMove);
    canvas.addEventListener("pointerup", handlepointerUp);
    canvas.addEventListener("pointerleave", handlepointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlepointerDown);
      canvas.removeEventListener("pointermove", handlepointerMove);
      canvas.removeEventListener("pointerup", handlepointerUp);
      canvas.removeEventListener("pointerleave", handlepointerUp);
    };
  }, [globalState.check]);

  return (
    <>
      <video
        ref={globalState.video}
        onPlay={() => globalState.setIsPlaying(true)}
        onPause={() => globalState.setIsPlaying(false)}
        width={500}
        height={300}
        className="video"
        onLoadedMetadata={(e) => {
          return globalState.setDuration((duration) => e.target.duration);
        }}
      >
        <source src={globalState.videoSrc} type="video/mp4" />
      </video>
      <div className="box1">
        <canvas
          ref={globalState.videoCanvas}
          width={500}
          height={300}
          className="box2"
        ></canvas>
        <canvas
          ref={globalState.drawCanvas}
          width={500}
          height={300}
          className="box2"
        ></canvas>
      </div>
      <div className="contents">
        <IconButton
          icon={globalState.isPlaying ? <PauseIcon /> : <PlayIcon />}
          backgroundColor={globalState.isPlaying ? "red" : "blue"}
          size="sm"
          className="item"
          onClick={handleClick}
          width={"5px"}
        ></IconButton>
        <Slider.Root
          width={"420px"}
          className="item"
          value={globalState.videoTime}
          min={0}
          max={globalState.duration}
          step={0.0001}
          onChange={(e) => {
            globalState.video.current.currentTime = e;
            return globalState.setVideoTime((videoTime) => e);
          }}
          colorScheme={"blue"}
        />
      </div>
      <Text>videoTime: {globalState.videoTime}</Text>
    </>
  );
}
