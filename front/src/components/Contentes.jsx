import { useEffect, useState, useContext } from "react";
import { Context } from "./App";
import { List, Undo2Icon, IconButton, FilePlusIcon } from "@yamada-ui/react";
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
      .then((res) => setCategoryList((list) => res.data));
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    fetch(`/editdata/${categoryId}`)
      .then((res) => res.json())
      .then((res) => {
        globalState.setEditData((editData) => res.result.data);
      });
  }, [categoryId]);

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Contents</h2>
      {!isReturnIcon && (
        <IconButton
          icon={<Undo2Icon />}
          onClick={() => {
            setisReturnIcon((isReturnIcon) => true);
            navigate("/home");
            location.reload();
          }}
        ></IconButton>
      )}
      <List.Root>
        {isReturnIcon
          ? categoryList.map((ele) => {
              return (
                <List.Item
                  onClick={(e) => {
                    setCategoryId((categoryId) => e.target.id);
                    setisReturnIcon((isReturnIcon) => false);
                  }}
                  key={ele.category_id}
                  id={ele.category_id}
                  fontSize={24}
                  marginTop={30}
                >
                  {ele.category_name}
                  <IconButton
                    marginLeft={100}
                    icon={<FilePlusIcon />}
                    backgroundColor={"green"}
                    key={ele.category_name}
                    id={ele.category_id}
                    onClick={() => {
                      globalState.setEditData((data) => {
                        data[0].category_id = ele.category_id;
                        return data;
                      });
                      navigate("/edit");
                    }}
                  ></IconButton>
                </List.Item>
              );
            })
          : globalState.editData.map((ele, i) => {
              return (
                <List.Item
                  onClick={(e) => {
                    globalState.setEditData((editData) =>
                      editData.filter((a) => a.edit_id === Number(e.target.id)),
                    );
                    navigate("/edit");
                  }}
                  key={i}
                  id={ele.edit_id}
                >
                  {ele.create_date_at}
                </List.Item>
              );
            })}
      </List.Root>
    </>
  );
}
