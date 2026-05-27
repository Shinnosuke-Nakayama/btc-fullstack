import { VideoScreen } from "./videoComponents/VideoScreen";
import { VideoEditer } from "./videoComponents/VideoEditer";
import { use, useContext, useState } from "react";
import {
  FileButton,
  Undo2Icon,
  IconButton,
  Grid,
  Flex,
  Heading,
  Spacer,
} from "@yamada-ui/react";
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
      <Flex
        marginTop={2}
        marginBottom={4}
        marginLeft={"auto"}
        marginRight={"auto"}
        paddingLeft={40}
        paddingRight={40}
        width={"80%"}
        align="center"
        backgroundColor={"white"}
        justifyContent={"center"}
      >
        <FileButton
          ref={globalState.fileName}
          onChange={(e) => {
            const file = e[0];
            const URL = webkitURL;
            const src = URL.createObjectURL(file);
            globalState.setVideoSrc((videoSrc) => src);
          }}
          fontSize={24}
          backgroundColor={"green"}
          display={isUplodeBtn && "hidden"}
        >
          File Select
        </FileButton>
        <Spacer />
        <Heading as={"h1"} size={"6xl"}>
          Video
        </Heading>
        <Spacer />
        <IconButton
          icon={<Undo2Icon />}
          backgroundColor={"amber"}
          size={"xl"}
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
            navigate("/");
            location.reload();
          }}
        ></IconButton>
      </Flex>
      <Grid
        gap="md"
        gridTemplateColumns="repeat(2, 50%)"
        placeContent={"center"}
        placeItems={"center"}
      >
        <VideoScreen
          key={globalState.videoSrc}
          check={check}
          setCheck={setCheck}
        />
        <VideoEditer key={globalState.duration} setCheck={setCheck} />
      </Grid>
    </>
  );
}
