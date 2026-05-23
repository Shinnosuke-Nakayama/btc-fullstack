import "../App.css";
import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Contentes } from "./Contentes";
import { Video } from "./Video";

function App() {
  // const [message, setMessage] = useState();

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.text())
  //     .then((data) => setMessage(data));
  // }, []);

  return (
    <>
      {/* <div className="App">Message from the backend: {message}</div>
      <Login />
      <Contentes /> */}
      <Video />
    </>
  );
}

export default App;
