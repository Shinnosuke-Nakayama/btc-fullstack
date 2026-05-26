import { VideoScreen } from "./videoComponents/VideoScreen";
import { VideoEditer } from "./videoComponents/VideoEditer";
import { useContext, useState } from "react";
import { FileButton, Undo2Icon, IconButton } from "@yamada-ui/react";
import { Context } from "./App";
import { useNavigate } from "react-router-dom";

export function Video() {
  const globalState = useContext(Context);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Video</h2>
      {!globalState.editData[0].contents_path && (
        <FileButton
          ref={globalState.fileName}
          onChange={(e) => {
            const file = e[0];
            const URL = webkitURL;
            const src = URL.createObjectURL(file);
            globalState.setVideoSrc((videoSrc) => src);
          }}
        >
          Upload
        </FileButton>
      )}
      <IconButton
        icon={<Undo2Icon />}
        onClick={() => {
          navigate("/home");
          location.reload();
        }}
      ></IconButton>
      <VideoScreen
        className="p"
        key={globalState.videoSrc}
        check={check}
        setCheck={setCheck}
      />
      <VideoEditer
        className="p"
        key={globalState.duration}
        setCheck={setCheck}
      />
    </>
  );
}
