import React, { useState } from "react";
import { Link } from "react-dom";
import { draggableImages as initialImages } from "./DraggalbeAPI";
//css
import "./Gallery.css";

const Gallery = () => {
  const [dragstartElm, setDragstartElm] = useState(null);
  const [dragEnterSrc, setDragEnterSrc] = useState("");
  const [draggableImages, setDraggableImages] = useState(initialImages); // Manage images using state

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.src);
    setDragstartElm(e.target);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragEnterSrc(e.target.src);
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    // Swap only the dragstartElm image src
    if (dragstartElm && e.target.src !== dragstartElm.src) {
      const tempSrc = e.target.src;
      e.target.src = dragstartElm.src;
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Revert the src attributes
    e.target.src = dragEnterSrc;
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const tempSrc = e.target.src;
    e.target.src = tempSrc;
    dragstartElm.src = dragEnterSrc;
    setDragstartElm(null);
  };

  const handleDragEnd = () => {
    setDragstartElm(null);
  };

  const [checkedImages, setCheckedImages] = useState(
    new Array(draggableImages.length).fill(false)
  );

  const handleChecked = (index) => {
    const newCheckedImages = [...checkedImages];
    newCheckedImages[index] = !newCheckedImages[index];
    setCheckedImages(newCheckedImages);
  };

  //checked how many is checked
  const checkedCount = checkedImages.filter((isChecked) => isChecked).length;

  /* const handleDeleteItems = () => {
    const newImages = draggableImages.filter((_, index) => !checkedImages[index]);

    // Update the draggableImages state with the new array of images
    setDraggableImages(newImages);
  };*/

  return (
    <>
      <div className="Gallery">
        
        <div className="header">
          <p>
            {checkedCount === 0 ? `Gallery` : `${checkedCount} image select`}
          </p>
          <p>{"delete items"}</p>
        </div>

        {draggableImages.map((draggableImage, index) => (

          <div className="draggable" key={index}>
            <input
              type="checkbox"
              checked={checkedImages[index]}
              onChange={() => handleChecked(index)}
            />
            <img
              className={checkedImages[index] ? "checked" : ""}
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
      </div>
    </>
  );
};

export default Gallery;
