import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { ChakraProvider } from "@chakra-ui/react";

const { worker } = require("./mocks/browser");

worker.start();

const rootElement = document.getElementById("root");
ReactDOM.render(
   // <ChakraProvider>
   <App />,
   // </ChakraProvider>
   rootElement
);
