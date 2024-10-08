import { useState } from 'react';

const useValidate = enterData => {
  const [inputData, setInputData] = useState(enterData);

  const handleDataValue = (e, enterName, enterValue) => {
    const name = enterName !== undefined ? enterName : e.target.name;
    let value = enterValue !== undefined ? enterValue : e.target.value;

    // check for file type
    if (e?.currentTarget.files) {
      value = e.currentTarget.files[0] ?? null;
    }

    setInputData(prevValue => ({...prevValue, [name]: {...prevValue[name], value}}));
  }

  const validateData = handleAction => {
    let errors = 0;
    let tempData = {};

    for (let data in inputData) {
      const value = inputData[data].value;
      if (!data.includes('avatar') && !value.trim()) {
        tempData[data] = {...inputData[data], error: 'The field can\'t be empty!'};
        errors ++;
      } else if (data.includes('email')) {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'ig');
        if (!value.match(regex)) {
          tempData[data] = {...inputData[data], error: 'The email address is not valid!'};
          errors ++;
        } else {
          tempData[data] = {...inputData[data], error: false};
        }
      } else if (data.includes('password') && value.length < 6) {
          tempData[data] = {...inputData[data], error: 'Password must contain at least 6 characters.'};
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

  return {inputData, setInputData, handleDataValue, validateData, resetData};
}

export default useValidate;