import './style.scss'
import React from "react";

const TextInput = ({value, setValue, placeholder, name, onChangeFunc, overlayElement, className, inputType, idInput, height}) => {

  return (
    <div className={`text-input-2 ${className}`} >
      <label htmlFor={idInput}>{name}</label>
      <input
        className="date-input"
        type={inputType ? inputType : 'text'}
        id={idInput}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {setValue(e.target.value)}}
        style={{ height: height }} 
        />
    </div>
  );
}

export default TextInput