import { VideoScreen } from "./videoComponents/VideoScreen";
import { VideoEditer } from "./videoComponents/VideoEditer";
import { useContext } from "react";
import { FileButton } from "@yamada-ui/react";
import { Context } from "./App";

export function Video() {
  const globalState = useContext(Context);

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Video</h2>
      <FileButton
        onChange={(e) => {
          const file = e[0];
          const URL = webkitURL;
          const src = URL.createObjectURL(file);
          globalState.setVideoSrc((videoSrc) => src);
        }}
      >
        Upload
      </FileButton>
      <VideoScreen className="p" key={globalState.videoSrc} />
      <VideoEditer className="p" key={globalState.duration} />
    </>
  );
}
