import React, { useState } from "react";
import { draggableImages as initialImages } from "./Images";

import { BiSolidImage } from "react-icons/bi";
//css
import "./Gallery.css";

const Gallery = () => {
  const [dragstartElm, setDragstartElm] = useState(null);
  const [dragEnterSrc, setDragEnterSrc] = useState("");
  const [dynamicClass, setDynamicClass] = useState(false);

  // Function to handle the start of a drag operation
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.src);
    setDragstartElm(e.target);
  };
  
// Function to handle the drag enter event
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragEnterSrc(e.target.src);
  };

  // Function to handle the drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setDynamicClass(true);

    // Swap only the dragstartElm image src
    if (dragstartElm && e.target.src !== dragstartElm.src) {
      e.target.src = dragstartElm.src;
    }
  };

  // Function to handle the drag Leave event
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDynamicClass(false);

    // Revert the src attributes
    e.target.src = dragEnterSrc;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDynamicClass(false);

    const tempSrc = e.target.src;
    e.target.src = tempSrc;
    dragstartElm.src = dragEnterSrc;
    setDragstartElm(null);
  };

  const handleDragEnd = () => {
    setDragstartElm(null);
  };

  // get the value of initialImages in the  draggableImages
  const [draggableImages, setDraggableImages] = useState(initialImages);

  //initialize it as an array and filled false for each element
  const [checkedImages, setCheckedImages] = useState(
    new Array(draggableImages.length).fill(false)
  );

  // this function take a parameter , create copy checkedImages array and toggle the value
  const handleChecked = (index) => {
    const newCheckedImages = [...checkedImages];
    newCheckedImages[index] = !newCheckedImages[index];
    setCheckedImages(newCheckedImages);
  };

  //get the length how many is checked image
  const checkedCount = checkedImages.filter((isChecked) => isChecked).length;

  //delete item function
  const handleDeleteItems = () => {
    const newImages = draggableImages.filter(
      (_, index) => !checkedImages[index]
    );

    setDraggableImages(newImages);

    //set check images false
    setCheckedImages(checkedImages.fill(false));
  };

  return (
    <>
      <div className="Gallery">
        <div className="header">
          <p>
            {checkedCount === 0 ? (
              `Gallery`
            ) : checkedCount === 1 ? (
              <>
                <input type="checkbox" defaultChecked />
                {checkedCount} File Selected
              </>
            ) : (
              <>
                <input type="checkbox" defaultChecked />
                {checkedCount} Files Selected
              </>
            )}
          </p>

          <p onClick={handleDeleteItems}>
            {checkedCount === 0
              ? ""
              : checkedCount === 1
              ? "Delete File"
              : "Delete Files"}
          </p>
        </div>

        {draggableImages.map((draggableImage, index) => (
          <div
            style={dynamicClass ? { border: "1px dotted black" } : {}}
            className={checkedImages[index] ? "draggable selected " : "draggable"}
            key={index}
          >
            <input
              type="checkbox"
              checked={checkedImages[index]}
              onChange={() => handleChecked(index)}
              className="input_check"
            />
            <img
              className={checkedImages[index] ? "checked" : " "}
              src={draggableImage.props.src}
              alt="pic"
              onDrag={(e) => handleDragStart(e)}
              onDragEnter={(e) => handleDragEnter(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDrop={(e) => handleDrop(e)}
              onDragEnd={handleDragEnd}
            />
          </div>
        ))}

        <div className="add_image">
          <BiSolidImage className="add_img_icon" />
          <p>Add Images</p>
        </div>
      </div>
    </>
  );
};

export default Gallery;
