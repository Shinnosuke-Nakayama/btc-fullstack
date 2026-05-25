import { useEffect, useState, useContext } from "react";
import { Context } from "./App";
import { List, Undo2Icon, IconButton } from "@yamada-ui/react";
import { useNavigate } from "react-router-dom";

export function Contentes() {
  const globalState = useContext(Context);
  const [num, setNum] = useState(0);
  const [is, setIs] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/categorys`)
      .then((res) => res.json())
      .then((res) => globalState.setCategoryList((list) => res.data));
  }, []);

  useEffect(() => {
    fetch(`/editdata/${num}`)
      .then((res) => res.json())
      .then((res) => {
        globalState.setEditData((editData) => res.result.data);
      });
  }, [num]);

  return (
    <>
      {/* ゆくゆくはヘッダーはコンポーネントを分ける */}
      <h2>Contents</h2>
      {!is && (
        <IconButton
          icon={<Undo2Icon />}
          onClick={() => setIs((is) => true)}
        ></IconButton>
      )}
      <List.Root>
        {is
          ? globalState.categoryList.map((ele) => {
              return (
                <List.Item
                  onClick={(e) => {
                    setNum((num) => e.target.id);
                    setIs((is) => false);
                  }}
                  key={ele.category_id}
                  id={ele.category_id}
                >
                  {ele.category_name}
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
