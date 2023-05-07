import { useNavigate } from 'react-router-dom';
import CustomSelect from '../CustomSelect';
import { useUserContext } from '../../context/user_context';
import { useFeedbackContext } from '../../context/feedback_context';
import { icons } from '../../constants';
import { HiPlusSm } from 'react-icons/hi';

const SuggestionsBoard = () => {
  const {currentUser} = useUserContext();
  const {suggestedFeedbacks, currentSort, updateSort} = useFeedbackContext();
  const selectOptions = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'];
  const navigate = useNavigate();

  // handle click on option item
  const handleOptionClick = optionValue => {
    updateSort(optionValue);
  }

  return (
    <div className="suggestions-board-holder">
      <div className="holder-control">
        <img src={icons.iconSuggestions} alt="suggestions" />
        <h3>
          <span className="suggestions-value">{suggestedFeedbacks.length} </span>
          Suggestions
        </h3>
        <div className="holder-sort">
          <span>Sort by:</span>
          <CustomSelect 
            options={selectOptions} 
            currentOption={currentSort} 
            optionAction={handleOptionClick}  
          />
        </div>
      </div>
      {currentUser && (
        <button 
          type="button" 
          className="btn btn-purple btn-icon" 
          onClick={() => navigate('/add-edit')}
        >
          <HiPlusSm />
          Add Feedback
        </button>
      )}
    </div>
  )
}

export default SuggestionsBoard;