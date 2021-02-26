import React, { useRef } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

export default function AddMenu(props) {
   const colorname = useRef();
   const hexcode = useRef();

   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            if (
               hexcode.current.value.length < 1 ||
               colorname.current.value.length < 1
            ) {
               return;
            }
            console.log(hexcode.current.value);
            axiosWithAuth()
               .post("http://localhost:5000/api/colors", {
                  color: String(colorname.current.value),
                  code: {
                     hex:
                        hexcode.current.value[0] === "#"
                           ? String(hexcode.current.value)
                           : "#" + String(hexcode.current.value),
                  },
               })
               .then((res) => {
                  // console.log(res);
                  props.ping();
                  props.modal.current.style.visibility = "hidden";
               })
               .catch((err) => {});
         }}
         style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-20px",
            textAlign: "center",
         }}
      >
         <p>Add color</p>
         <label htmlFor="colorName">color name:</label>
         <input name="colorName" id="colorName" ref={colorname} />

         <label htmlFor="hex">hex code:</label>
         <input name="hex" id="hex" ref={hexcode} />

         <div className="button-row">
            <button type="submit">add</button>
            <button
               onClick={(e) => {
                  e.preventDefault();
                  props.modal.current.style.visibility = "hidden";
               }}
            >
               notyet
            </button>
         </div>
      </form>
   );
}
