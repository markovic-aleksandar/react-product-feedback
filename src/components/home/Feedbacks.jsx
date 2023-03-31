import Loading from '../Loading';
import Feedback from '../Feedback';
import NoFeedbacks from '../NoFeedbacks';
import { useFeedbackContext } from '../../context/feedback_context';
import { getFeedbacksByStatus } from '../../utils';

const Feedbacks = () => {
  const {feedbacksLoading, suggestedFeedbacks} = useFeedbackContext();

  return (
    <div className="feedbacks-container">
      {feedbacksLoading ? (
        <Loading /> 
      ) : suggestedFeedbacks.length < 1 ? (
        <NoFeedbacks />
      ) : (
        suggestedFeedbacks.map(feedback => {
          return <Feedback key={feedback.id} {...feedback} />
        })
      )}
    </div>
  )
}

export default Feedbacks;