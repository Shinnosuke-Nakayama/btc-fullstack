import { VideoScreen } from "./videoComponents/VideoScreen";
import { VideoEditer } from "./videoComponents/VideoEditer";
import { use, useContext, useState } from "react";
import { FileButton, Undo2Icon, IconButton } from "@yamada-ui/react";
import { Context } from "./App";
import { useNavigate } from "react-router-dom";

export function Video() {
  const globalState = useContext(Context);
  const [check, setCheck] = useState(false);
  const [isUplodeBtn] = useState(globalState.editData[0].contents_path);
  const navigate = useNavigate();

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Video</h2>
      {!isUplodeBtn && (
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
          globalState.setEditData((data) => [
            {
              category_id: 0,
              comment: "",
              contents_path: null,
              contents_status: "",
              create_date_at: "",
              edit_date_at: null,
              edit_id: 0,
              focus_end_time: 0,
              focus_point_x: 0,
              focus_point_y: 0,
              focus_start_time: 0,
              user_id: 0,
            },
          ]);
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
