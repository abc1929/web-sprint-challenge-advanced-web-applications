import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
   const [colorList, setColorList] = useState([]);
   const [trigger, setTrigger] = useState(0);
   const ping = () => {
      setTrigger(trigger + 1);
   };

   useEffect(() => {
      if (props.mock) {
         setColorList(props.mockdata);
         return;
      } // a bit of a hack for testing in jest, otherwise it has issues that I have yet to solve
      axiosWithAuth()
         .get("http://localhost:5000/api/colors")
         .then((res) => {
            setColorList(res.data);
         })
         .catch((err) => {});
   }, [trigger]);

   return (
      <div style={{ display: "flex", flexDirection: "row" }}>
         <ColorList
            colors={colorList}
            updateColors={setColorList}
            ping={ping}
         />
         <Bubbles colors={colorList} />
      </div>
   );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
