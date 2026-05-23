import { VideoScreen } from "./videoComponents/VideoScreen";
import { VideoCanvas } from "./videoComponents/VideoCanvas";
export function Video() {
  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Video</h2>
      <VideoScreen />
      <VideoCanvas />
    </>
  );
}
