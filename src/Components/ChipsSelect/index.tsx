import React, { useEffect, useRef, useState } from 'react'
import "./index.css";
import Chips from '../Chips';
import Option from '../Option';
type Props = {}

const initioalOptionList = ["Akshay", "Tanya", "Rohit"];

const ChipsSelect: React.FC = (_props: Props) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [backSpaceCheck, setBackSpaceCheck] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [optionList, setOptionList] = useState<string[]>([...initioalOptionList]);
  const [selectdOptions, setSelectedOptions] = useState<string[]>([]);

  const inputChangeHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setOptionList(initioalOptionList.filter(val => val.toLowerCase().includes(value.toLowerCase()) && !selectdOptions.includes(value)))
    setShowOptions(value.length > 0);
  }

  const optionSelectionHandler = (value: string) => {
    setSelectedOptions(prev => {
      let newSelectedOptions = [...prev, value];
      let newList = initioalOptionList.filter(value => inputRef.current?.value && value.toLowerCase().includes(inputRef.current?.value.toLowerCase()) && !newSelectedOptions.includes(value));
      setOptionList(newList);
      return newSelectedOptions;
    });
  }

  const actionCheckHandler = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Backspace" && inputRef.current?.value === "") {
      if (!backSpaceCheck) {
        setBackSpaceCheck(true);
        return;
      }
      let list = [...selectdOptions];
      let popedElement = list.pop();
      setOptionList((prev) => {
        if (popedElement) return [...prev, popedElement];
        return prev;
      });
      setBackSpaceCheck(false);
      setSelectedOptions(list);
    }
  }

  const highlightCheck = (index: number): boolean => {
    return backSpaceCheck && selectdOptions.length - 1 === index;
  }

  const removeSelectedOption = (index: number) => {
    let list = [...selectdOptions];
    list.splice(index, 1);
    setOptionList((prev) => ([...prev, selectdOptions[index]]));
    setSelectedOptions(list);
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShowOptions(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <div className='container' ref={containerRef}>
      <div className='inputContainer'>
        {selectdOptions.map((chipsValue, index) => <Chips onClose={() => removeSelectedOption(index)} highLight={highlightCheck(index)} value={chipsValue} />)}
        <input ref={inputRef} className='searchInput' type='text' onKeyDown={actionCheckHandler} onChange={inputChangeHandler} />
      </div>

      {showOptions && <div className='OptionContainer'>
        {optionList.length ? optionList.map((val, index) => <Option key={index} onClick={() => optionSelectionHandler(val)} value={val} />) : <div >No items to display</div>}
      </div>}
    </div>
  )
}

export default ChipsSelect;
