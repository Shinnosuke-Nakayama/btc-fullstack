import { VideoScreen } from "./videoComponents/VideoScreen";
import { VideoEditer } from "./videoComponents/VideoEditer";
import { useContext } from "react";
import { Context } from "./App";

export function Video() {
  const globalState = useContext(Context);

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Video</h2>
      <VideoScreen />
      <VideoEditer key={globalState.duration} />
    </>
  );
}
