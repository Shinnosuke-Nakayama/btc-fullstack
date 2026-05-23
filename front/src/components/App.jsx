import "../App.css";
import { useEffect, useState, createContext } from "react";
import { Login } from "./Login";
import { Contentes } from "./Contentes";
import { Video } from "./Video";
import { state } from "./state";
export const Context = createContext();

function App() {
  // const [message, setMessage] = useState();

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.text())
  //     .then((data) => setMessage(data));
  // }, []);

  return (
    <Context Provider value={state()}>
      {/* <div className="App">Message from the backend: {message}</div>
      <Login />
      <Contentes /> */}
      <Video />
    </Context>
  );
}

export default App;
