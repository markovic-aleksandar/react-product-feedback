import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import Feedback from '../Feedback';
import NoFeedbacks from '../NoFeedbacks';
import { useFeedbackContext } from '../../context/feedback_context';
import { getFeedbacksByStatus } from '../../utils';

const Feedbacks = () => {
  const {feedbacksLoading, suggestedFeedbacks} = useFeedbackContext();
  const navigate = useNavigate('/');

  const handleFeedbackAction = id => {
    navigate(`/single/${id}`);
  }

  return (
    <div className="feedbacks-container">
      {feedbacksLoading ? (
        <Loading /> 
      ) : suggestedFeedbacks.length < 1 ? (
        <NoFeedbacks />
      ) : (
        suggestedFeedbacks.map(feedback => {
          return <Feedback 
            key={feedback.id} 
            {...feedback} 
            handleFeedbackAction={handleFeedbackAction}
          />
        })
      )}
    </div>
  )
}

export default Feedbacks;