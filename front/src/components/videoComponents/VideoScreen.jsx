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
  Modal,
  Flex,
  Card,
} from "@yamada-ui/react";

import { Context } from "../App";

import { s3GetSignedUrl } from "../../../utils";

export function VideoScreen({ check, setCheck }) {
  const globalState = useContext(Context);
  const video = useRef(null); //a
  const drawCanvas = useRef(null); //a
  const videoCanvas = useRef(null); //a
  const [videoTime, setVideoTime] = useState(0.0); //a
  const [isPlaying, setIsPlaying] = useState(false); //a
  const [isLoding, setIsLoding] = useState(true);
  const [forcusData, setFocusData] = useState({
    start: globalState.editData[0].focus_start_time,
    end: globalState.editData[0].focus_end_time,
    x: globalState.editData[0].focus_point_x,
    y: globalState.editData[0].focus_point_y,
  });

  useEffect(() => {
    try {
      if (globalState.editData[0].contents_path) {
        s3GetSignedUrl(globalState.editData[0].contents_path).then((res) =>
          globalState.setVideoSrc((src) => res),
        );
      } else {
        setIsLoding((is) => false);
      }
    } catch (e) {
      console.log(e);
      setIsLoding((is) => false);
    }

    setFocusData((data) => ({
      start: globalState.editData[0].focus_start_time,
      end: globalState.editData[0].focus_end_time,
      x: globalState.editData[0].focus_point_x,
      y: globalState.editData[0].focus_point_y,
    }));
  }, []);

  async function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }

  useEffect(() => {
    if (check) return;
    const dCanvas = drawCanvas.current;
    const context = dCanvas.getContext("2d");
    if (!forcusData) return;
    if (!(forcusData.start < videoTime && videoTime < forcusData.end)) {
      const canvas = drawCanvas.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [globalState.editData]);

  useEffect(() => {
    const timer = setInterval(function () {
      const vCanvas = videoCanvas.current;
      const videoImg = video.current;
      const dCanvas = drawCanvas.current;
      if (!dCanvas) return;
      const context = dCanvas.getContext("2d");
      vCanvas.getContext("2d").drawImage(videoImg, 0, 0, 640, 360);

      setVideoTime((videoTime) => {
        if (check) return video.current.currentTime;
        setFocusData((data) => ({
          start: globalState.editData[0].focus_start_time,
          end: globalState.editData[0].focus_end_time,
          x: globalState.editData[0].focus_point_x,
          y: globalState.editData[0].focus_point_y,
        }));
        if (forcusData.start < videoTime && videoTime < forcusData.end) {
          context.clearRect(0, 0, vCanvas.width, vCanvas.height);
          context.lineWidth = 8; //線の太さを変える
          context.strokeStyle = "#ff0000";
          context.beginPath();
          context.arc(forcusData.x, forcusData.y, 50, 0, Math.PI * 2, false);
          context.stroke();
        } else if (videoTime >= forcusData.end) {
          const canvas = drawCanvas.current;
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        return video.current.currentTime;
      });
    }, 1000 / 30);
    return () => {
      clearInterval(timer);
    };
  }, [check]);

  useEffect(() => {
    let isDragging = false;
    let dragStartPoint = null;

    const canvas = drawCanvas.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let circleOrigin = check
      ? { x: 100, y: 100 }
      : { x: globalState.forcusX, y: globalState.forcusY };

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
      const canvas = drawCanvas.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    check ? draw() : reset();

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
  }, [check]);

  return (
    <>
      <Modal.Root
        body="少々お待ちください！"
        title="更新中です！"
        open={isLoding}
        withCloseButton={false}
      />
      <Card.Root
        // placeContent={"center"}
        // placeItems={"center"}
        variant={"elevated"}
        paddingLeft={8}
        paddingTop={8}
        width={"95%"}
      >
        <Flex direction="column" className="container">
          <video
            ref={video}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            width={640}
            height={360}
            className="video layer"
            onLoadedMetadata={(e) => {
              globalState.setDuration((duration) => e.target.duration);
              setIsLoding((is) => false);
            }}
          >
            <source src={globalState.videoSrc} type="video/mp4" />
          </video>
          {/* <div className="box1"> */}
          <canvas
            ref={videoCanvas}
            width={640}
            height={360}
            className="layer"
          ></canvas>
          <canvas
            ref={drawCanvas}
            width={640}
            height={360}
            className="layer"
          ></canvas>
          <Flex gap="md">
            <IconButton
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              backgroundColor={isPlaying ? "red" : "blue"}
              size="sm"
              onClick={handleClick}
              marginTop={380}
              marginRight={30}
              width={30}
            ></IconButton>
            <Slider.Root
              marginTop={380}
              width={500}
              value={videoTime}
              min={0}
              max={globalState.duration}
              step={0.0001}
              onChange={(e) => {
                video.current.currentTime = e;
                return setVideoTime((videoTime) => e);
              }}
              colorScheme={"blue"}
            />
          </Flex>
          {/* </div> */}
          <Text>videoTime: {videoTime}</Text>
        </Flex>
      </Card.Root>
    </>
  );
}
