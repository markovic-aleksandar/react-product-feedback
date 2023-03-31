import { useFeedbackContext } from '../context/feedback_context';
import { contstant } from "../constants";

const CategoryBoard = () => {
  const {currentCategory, updateFilter} = useFeedbackContext();
  const {categories} = contstant;

  return (
    <div className="categories-board-holder">
      <div className="categories">
        {categories.map(category => {
          const {id, name, label} = category;
          return <button 
            key={id} 
            type="button" 
            className={`category flag${currentCategory === name ? ' active' : ''}`}
            onClick={() => updateFilter(name)}
          >
            {label}
          </button>
        })}
      </div>
    </div>
  )
}

export default CategoryBoard;