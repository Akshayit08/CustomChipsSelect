import React from 'react'
import img from "../../Assets/images/download.png";
import "./index.css";

type Props = {
    onClick: () => void,
    value: string | number
}

const Option = ({onClick, value}: Props) => {
  return (
    <div className='optionContainer' onClick={onClick}>
        <img className='optionImage' src={img}/>
        <span className='optionValue'>{value}</span>
    </div>
  )
}

export default Option