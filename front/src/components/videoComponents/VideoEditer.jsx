import { useMemo, useContext, useEffect, useState } from "react";
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
} from "@yamada-ui/react";
import { Context } from "../App";
import { useRef } from "react";

export function VideoEditer() {
  const globalState = useContext(Context);
  const refTextArea = useRef("");
  const [radioValue, setRadioValue] = useState("");

  const [forcusTime, setForcusTime] = useState([0, globalState.duration]);

  const status = useMemo(
    () => [
      { label: "Good", value: "Good" },
      { label: "Bad", value: "Bad" },
      { label: "Memo", value: "Memo" },
    ],
    [],
  );

  const editDataFetch = async () => {
    const req = {
      category_id: 1,
      comment: refTextArea.current.value,
      contents_path: globalState.videoSrc,
      contents_status: radioValue,
      create_date_at: new Date(),
      edit_date_at: null,
      focus_end_time: forcusTime[1],
      focus_point_x: globalState.forcusX,
      focus_point_y: globalState.forcusY,
      focus_start_time: forcusTime[0],
      user_id: 3,
    };

    let res = await fetch("/editdatapost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
  };

  return (
    <>
      <RadioGroup.Root
        items={status}
        orientation="horizontal"
        onChange={(e) => setRadioValue((value) => e)}
      />
      <Textarea size={"xl"} placeholder="comment" ref={refTextArea} />
      <Checkbox
        onClick={(e) => globalState.setCheck((check) => e.target.checked)}
      >
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
        defaultValue={[0, globalState.duration]}
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
        }}
      >
        Submit
      </Button>
    </>
  );
}
