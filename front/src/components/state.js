import { useState, useRef } from "react";

export const state = () => {
  const fileName = useRef(null); //props
  const [duration, setDuration] = useState(0);
  const [forcusX, setForcusX] = useState(100);
  const [forcusY, setForcusY] = useState(100);
  const [videoSrc, setVideoSrc] = useState();
  const [editData, setEditData] = useState([
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

  return {
    duration,
    setDuration,
    forcusX,
    setForcusX,
    forcusY,
    setForcusY,
    videoSrc,
    setVideoSrc,
    editData,
    setEditData,
    fileName,
  };
};
