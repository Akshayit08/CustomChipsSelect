import React from 'react'
import "./index.css";
import img from "../../Assets/images/download.png";
import close from "../../Assets/images/close.png";
type Props = {
    value: string,
    highLight: boolean,
    onClose: () => void,
}

const Chips = ({value, highLight, onClose}: Props) => {
  return (
    <span className={`chips ${highLight ? "higlight" : ""}`}>
        <img className='chipsImage' src={img}/>
        {value}
        <img className='chipsClose' src={close} onClick={onClose}/>
    </span>
  )
}

export default Chips