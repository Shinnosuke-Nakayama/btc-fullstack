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

export function VideoEditer() {
  const globalState = useContext(Context);

  const [forcusTime, setForcusTime] = useState([0, globalState.duration]);

  const status = useMemo(
    () => [
      { label: "Good", value: "1" },
      { label: "Bad", value: "2" },
      { label: "Memo", value: "3" },
    ],
    [],
  );

  return (
    <>
      <RadioGroup.Root items={status} orientation="horizontal" />
      <Textarea size={"xl"} placeholder="comment" />
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
        onClick={() => {
          console.log(
            globalState.videoSrc,
            forcusTime[0],
            forcusTime[1],
            globalState.forcusX,
            globalState.forcusY,
          );
        }}
      >
        Submit
      </Button>
    </>
  );
}
