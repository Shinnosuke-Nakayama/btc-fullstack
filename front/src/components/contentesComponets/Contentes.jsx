import { useEffect, useState, useContext } from "react";
import { Context } from "../App";
import {
  List,
  Undo2Icon,
  IconButton,
  FilePlusIcon,
  Container,
  Flex,
  Text,
  Grid,
  Heading,
} from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";

export function Contentes() {
  const globalState = useContext(Context);
  const [categoryId, setCategoryId] = useState(0);
  const [isReturnIcon, setisReturnIcon] = useState(true);
  const [categoryList, setCategoryList] = useState([]); //a
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/categorys`)
      .then((res) => res.json())
      .then((res) => setCategoryList((list) => res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    fetch(`/editdata/${categoryId}`)
      .then((res) => res.json())
      .then((res) => {
        globalState.setEditData((editData) => res.result.data);
      })
      .catch((e) => console.log(e));
    console.log(categoryId);
  }, [categoryId]);

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <Flex
        marginTop={2}
        marginBottom={4}
        marginLeft={"auto"}
        marginRight={"auto"}
        placeContent={"center"}
        placeItems={"center"}
        backgroundColor={"white"}
        width={"80%"}
      >
        <Heading as={"h1"} size={"6xl"}>
          Contents
        </Heading>
        <IconButton
          icon={<Undo2Icon />}
          onClick={() => {
            setisReturnIcon((isReturnIcon) => true);
            navigate("/");
            location.reload();
          }}
          display={isReturnIcon && "hidden"}
          backgroundColor={"amber"}
          marginLeft={4}
        ></IconButton>
      </Flex>
      <Grid
        gap="md"
        gridTemplateColumns="repeat(2, 30%)"
        placeContent={"center"}
        placeItems={"center"}
      >
        {isReturnIcon &&
          categoryList.map((ele) => {
            return (
              <Container.Root
                variant={"elevated"}
                width={"70%"}
                margin={"6"}
                backgroundColor={"gray.250"}
                centerContent
                key={ele.category_id}
              >
                <Container.Header
                  onClick={(e) => {
                    setCategoryId((categoryId) => ele.category_id);
                    setisReturnIcon((isReturnIcon) => false);
                  }}
                  id={ele.category_id}
                  fontSize={28}
                  color={"darkblue"}
                  flexDirection="column"
                  cursor={"pointer"}
                >
                  <Text>{ele.category_name}</Text>
                </Container.Header>
                <Container.Body>
                  <IconButton
                    marginLeft={100}
                    icon={<FilePlusIcon />}
                    backgroundColor={"green"}
                    key={ele.category_name}
                    id={ele.category_id}
                    size={"lg"}
                    onClick={() => {
                      globalState.setEditData((data) => {
                        data[0].category_id = ele.category_id;
                        return data;
                      });
                      navigate("/edit");
                    }}
                  ></IconButton>
                </Container.Body>
              </Container.Root>
            );
          })}
        {!isReturnIcon &&
          globalState.editData.map((ele, i) => {
            return (
              <Container.Root
                variant={"elevated"}
                margin={"6"}
                backgroundColor={"gray.250"}
                centerContent
                key={ele.edit_id}
                width={"80%"}
              >
                <Container.Header
                  key={ele}
                  id={ele.edit_id}
                  fontSize={28}
                  color={"darkblue"}
                  color={
                    ele.contents_status === "Good"
                      ? "blue"
                      : ele.contents_status === "Bad"
                        ? "red"
                        : "darkcyan"
                  }
                  flexDirection="column"
                  cursor={"pointer"}
                  onClick={(e) => {
                    globalState.setEditData((editData) => {
                      return editData.filter(
                        (a) => a.edit_id === Number(ele.edit_id),
                      );
                    });
                    navigate("/edit");
                  }}
                >
                  <Text>{ele.contents_status}</Text>
                </Container.Header>
                <Container.Body>
                  <Text>{ele.create_date_at}</Text>
                </Container.Body>
              </Container.Root>
            );
          })}
      </Grid>
    </>
  );
}
