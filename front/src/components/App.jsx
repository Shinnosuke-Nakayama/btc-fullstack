import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import { createContext } from "react";
import { state } from "./state";
export const Context = createContext();

function App() {
  return (
    <Context Provider value={state()}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Context>
  );
}

export default App;
