import React, { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";

function App() {
   return (
      <ChakraProvider>
         <Router>
            <Box className="App">
               <Route exact path="/" component={Login} />
               <PrivateRoute path="/bubbles" component={BubblePage} />
            </Box>
         </Router>
      </ChakraProvider>
   );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
