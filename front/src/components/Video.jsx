import { VideoScreen } from "./videoComponents/VideoScreen";

export function Video() {
  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Video</h2>
      <VideoScreen />
    </>
  );
}
