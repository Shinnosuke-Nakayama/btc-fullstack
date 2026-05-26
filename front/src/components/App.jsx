import { BrowserRouter } from "react-router-dom";
import Router from "./Router/Router";
import "../App.css";
import { useEffect, useState, createContext } from "react";
import { Login } from "./Login";
import { Contentes } from "./contentesComponets/Contentes";
import { Video } from "./Video";
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
