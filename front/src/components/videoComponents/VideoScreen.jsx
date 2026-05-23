import { useEffect, useRef, useState } from "react";
import "./video.css";

export function VideoScreen() {
  //キャンバス内に動画を再生
  const videoCanvas = useRef(null);
  const video = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }
  useEffect(() => {
    setInterval(function () {
      const canvas = videoCanvas.current;
      const videoImg = video.current;
      canvas.getContext("2d").drawImage(videoImg, 0, 0, 500, 300);
    }, 1000 / 30);
  }, []);
  //

  //   キャンバス内に図形を描画
  const drawCanvas = useRef(null);
  useEffect(() => {
    let isDragging = false;
    let dragStartPoint = null;

    const canvas = drawCanvas.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let circleOrigin = { x: 50, y: 50 }; //ここの値は、データベースから渡す

    function draw(paramcircleOrigin) {
      if (!canvas) return;
      if (!context) return;

      const curcircleOrigin = paramcircleOrigin
        ? paramcircleOrigin
        : circleOrigin;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = 3; //線の太さを変える
      context.strokeStyle = "#ff0000";
      context.beginPath();
      context.arc(
        curcircleOrigin.x,
        curcircleOrigin.y,
        30,
        0,
        Math.PI * 2,
        false,
      );
      context.stroke();
    }

    draw();

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
  }, []);
  //

  return (
    <>
      <button className="btn" onClick={handleClick}>
        {isPlaying ? "Pause" : "Play"}{" "}
      </button>
      <div className="box1">
        <video
          ref={video}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          width={500}
          height={300}
          className="video"
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </video>
        <canvas
          ref={videoCanvas}
          width={500}
          height={300}
          className="box2"
        ></canvas>
        <canvas
          ref={drawCanvas}
          width={500}
          height={300}
          className="box2"
        ></canvas>
      </div>
    </>
  );
}
