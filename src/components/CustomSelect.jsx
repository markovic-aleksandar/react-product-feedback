import { useState } from 'react';
import { HiChevronDown, HiOutlineCheck } from 'react-icons/hi';

const CustomSelect = ({options, currentOption, optionAction}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const handleOption = optionValue => {
    optionAction(optionValue);
    setIsOpenSelect(false);
  }

  return (
    <div className={`select${isOpenSelect ? ' open' : ''}`}>
      <div className="select-input" onClick={() => setIsOpenSelect(!isOpenSelect)}>
        <span className="input-value">{currentOption}</span>
        <HiChevronDown />
      </div>
      <ul className="select-options">
        {options.map((option, index) => {
          return <li 
            key={index} 
            className={`option${option === currentOption ? ' active' : ''}`} 
            onClick={() => handleOption(option)}
          >
            {option}
            <HiOutlineCheck className="check-icon" color="#ad1fea" />
          </li>
        })}
      </ul>
    </div>
  )
}

export default CustomSelect;