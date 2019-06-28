import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, isClicked }) => {
  return (
    <div>
      <p className="f3 white ">
        {"This Magic Brain will detect faces in your pictures. Git it a try."}
      </p>
      <div className="center">
        <div className="form center br1 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="tex"
            onChange={onInputChange}
          />
          <div 
            className="flex white items-center justify-center input-reset ba b--white hover-bg-black bg-transparent grow pointer f4 dib w-30"
            onClick={onButtonSubmit}
          >
          Detect
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm; 
