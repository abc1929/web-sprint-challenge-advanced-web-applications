import React, { useState, useRef } from "react";
import EditMenu from "./EditMenu";
import axiosWithAuth from "../helpers/axiosWithAuth";
import AddMenu from "./AddMenu";

const initialColor = {
   color: "",
   code: { hex: "" },
};

const ColorList = ({ colors, updateColors, ping }) => {
   const [editing, setEditing] = useState(false);
   const [colorToEdit, setColorToEdit] = useState(initialColor);
   const modal = useRef();

   const editColor = (color) => {
      setEditing(true);
      setColorToEdit(color);
   };

   const saveEdit = (e) => {
      e.preventDefault();
      // console.log(colorToEdit);

      axiosWithAuth()
         .put("http://localhost:5000/api/colors/" + colorToEdit.id, colorToEdit)
         .then(() => {
            ping();
            setEditing(!editing);
         })
         .catch((err) => console.log(err));
   };

   const deleteColor = (color) => {
      // console.log(color);
      axiosWithAuth()
         .delete("http://localhost:5000/api/colors/" + color.id)
         .then(() => {
            ping();
            setEditing(!editing);
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="colors-wrap">
         <p>colors</p>
         <ul>
            {colors.map((color) => (
               <li
                  key={color.color}
                  data-testid={"color" + color.id}
                  onClick={() => editColor(color)}
               >
                  <span>
                     {editing && (
                        <span
                           className="delete"
                           onClick={(e) => {
                              e.stopPropagation();
                              deleteColor(color);
                           }}
                        >
                           x
                        </span>
                     )}{" "}
                     {color.color}
                  </span>
                  <div
                     className="color-box"
                     style={{ backgroundColor: color.code.hex }}
                  />
               </li>
            ))}
         </ul>
         {!editing && (
            <button
               onClick={() => {
                  modal.current.style.visibility = "visible";
               }}
            >
               Add Color
            </button>
         )}
         {editing && (
            <EditMenu
               colorToEdit={colorToEdit}
               saveEdit={saveEdit}
               setColorToEdit={setColorToEdit}
               setEditing={setEditing}
            />
         )}
         <div
            style={{
               position: "fixed",
               top: "0vh",
               left: "0vw",
               width: "100vw",
               height: "100vh",
               background: "rgba(0,0,0,0.75)",
               visibility: "hidden",
            }}
            ref={modal}
         >
            <div
               style={{
                  position: "fixed",
                  top: "30vh",
                  left: "40vw",
                  background: "#e6e6e6",
                  padding: "6vh",
               }}
            >
               <AddMenu modal={modal} ping={ping}></AddMenu>
            </div>
         </div>
      </div>
   );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
