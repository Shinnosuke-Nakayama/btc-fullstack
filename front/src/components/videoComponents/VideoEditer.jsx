import { useMemo, useContext, useEffect, useState, useRef } from "react";
import {
  Radio,
  RadioGroup,
  Textarea,
  Checkbox,
  Grid,
  GridItem,
  Text,
  Slider,
  Button,
  Modal,
} from "@yamada-ui/react";
import { Context } from "../App";
import {} from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../../utils";

export function VideoEditer({ setCheck }) {
  const globalState = useContext(Context);
  const refTextArea = useRef("");
  const [radioValue, setRadioValue] = useState("");
  const [forcusTime, setForcusTime] = useState([0, 0]);
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate();

  const status = useMemo(
    () => [
      { label: "Good", value: "Good" },
      { label: "Bad", value: "Bad" },
      { label: "Memo", value: "Memo" },
    ],
    [],
  );

  useEffect(() => {
    setForcusTime((time) => [
      Number(globalState.editData[0].focus_start_time),
      Number(globalState.editData[0].focus_end_time) || globalState.duration,
    ]);
    globalState.setForcusX((x) => globalState.editData[0].focus_point_x);
    globalState.setForcusY((y) => globalState.editData[0].focus_point_y);
  }, []);

  const editDataFetch = async () => {
    const req = {
      category_id: globalState.editData[0].category_id,
      comment: refTextArea.current.value,
      contents_path: globalState.fileName.current.files[0].name,
      contents_status: radioValue,
      create_date_at: new Date(),
      edit_date_at: null,
      focus_end_time: forcusTime[1],
      focus_point_x: globalState.forcusX,
      focus_point_y: globalState.forcusY,
      focus_start_time: forcusTime[0],
      user_id: 3,
    };
    try {
      setIsLoding((is) => true);
      await uploadVideo(globalState.fileName.current.files[0]);
      let res = await fetch("/editdatapost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      console.log(res);
      setIsLoding((is) => false);
    } catch (e) {
      setIsLoding((is) => false);
      console.log(e);
    }
  };

  return (
    <>
      <Modal.Root
        body="少々お待ちください！"
        title="登録中です！"
        open={isLoding}
        withCloseButton={false}
      />
      <RadioGroup.Root
        items={status}
        orientation="horizontal"
        onChange={(e) => setRadioValue((value) => e)}
        defaultValue={globalState.editData[0].contents_status}
      />
      <Textarea
        size={"xl"}
        placeholder="comment"
        ref={refTextArea}
        defaultValue={globalState.editData[0].comment}
      />
      <Checkbox onClick={(e) => setCheck((check) => e.target.checked)}>
        Focus
      </Checkbox>

      <Grid templateColumns="repeat(2, 0.5fr)">
        <GridItem>
          <Text>x:{Math.floor(globalState.forcusX)}</Text>
        </GridItem>
        <GridItem>
          <Text>y:{Math.floor(globalState.forcusY)}</Text>
        </GridItem>
        <>
          <GridItem>
            <Text>start:{forcusTime[0]}</Text>
          </GridItem>
          <GridItem>
            <Text>end: {forcusTime[1]}</Text>
          </GridItem>
        </>
        <></>
      </Grid>

      <Slider.Root
        defaultValue={
          Number(globalState.editData[0].focus_end_time)
            ? [
                Number(globalState.editData[0].focus_start_time),
                globalState.editData[0].focus_end_time,
              ]
            : [globalState.duration * 0.3, globalState.duration * 0.6]
        }
        min={0}
        max={globalState.duration}
        step={0.0001}
        onChange={(e) => setForcusTime((times) => [...e])}
        onChangeEnd={(e) => {
          setForcusTime((times) => [...e]);
        }}
        colorScheme={"green"}
      />
      <Button
        marginTop={50}
        backgroundColor={"green"}
        onClick={async () => {
          await editDataFetch();
          navigate("/home");
          // location.reload();
        }}
      >
        Submit
      </Button>
    </>
  );
}
