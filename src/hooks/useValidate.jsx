import { useState, useEffect } from 'react';

const useValidate = (enterData) => {
  const [inputData, setInputData] = useState(enterData);

  const handleDataValue = e => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData(prevValue => ({...prevValue, [name]: {...prevValue[name], value}}));
  }

  const validateData = (handleAction) => {
    let errors = 0;
    let tempData = {};
    for (let data in inputData) {
      if (!inputData[data].value) {
        tempData[data] = {...inputData[data], error: true};
        errors ++;
      } else {
        tempData[data] = {...inputData[data], error: false};
      }
    }
    setInputData(tempData);

    if (errors < 1) {
      handleAction();
    } else {
      return;
    }
  }

  const resetData = () => {

  }

  return {inputData, handleDataValue, validateData};
}

export default useValidate;