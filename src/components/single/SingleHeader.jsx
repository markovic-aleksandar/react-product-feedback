import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import { useFeedbackContext } from '../../context/feedback_context';
import { HiChevronLeft } from 'react-icons/hi';

const SingleHeader = ({currentID}) => {
  const {currentUser} = useUserContext();
  const {feedbacks} = useFeedbackContext();
  const currentUserOwnedFeedack = feedbacks.find(feedback => feedback.id === currentID && feedback.user_ref === currentUser?.id);
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <button 
        type="button" 
        className="btn-back"
        onClick={() => navigate('/')}  
      >
        <HiChevronLeft />
        Go Back
      </button>
      {currentUserOwnedFeedack && (
        <button 
          type="button" 
          className="btn btn-blue btn-icon"
          onClick={() => navigate(`/add-edit/${currentID}`)}
        >
          Edit Feedback
        </button>
      )}
    </div>
  )
}

export default SingleHeader;