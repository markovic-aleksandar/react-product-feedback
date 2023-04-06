import { useState } from 'react';

const useValidate = (enterData) => {
  const [inputData, setInputData] = useState(enterData);

  const handleDataValue = (e, enterValue) => {
    const name = e.target.name;
    const value = enterValue || e.target.value;

    setInputData(prevValue => ({...prevValue, [name]: {...prevValue[name], value}}));
  }

  const validateData = handleAction => {
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
    const tempData = {};
    for (let data in inputData) {
      tempData[data] = {value: '', error: false};
    }
    setInputData(tempData);
  }

  return {inputData, handleDataValue, validateData, resetData};
}

export default useValidate;