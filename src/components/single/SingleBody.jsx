import Feedback from '../Feedback';
import Comments from './Comments';
import AddComment from './AddComment';
import { useFeedbackContext } from '../../context/feedback_context';

const SingleBody = ({currentID}) => {  
  const {feedbacks} = useFeedbackContext();
  const currentFeedback = feedbacks.find(feedback => feedback.id === parseInt(currentID));
  const comments = currentFeedback.comments ? currentFeedback.comments : [];

  return (
    <>
      <Feedback {...currentFeedback} />
      <Comments feedbackId={currentID} comments={comments} />
      <AddComment feedbackId={currentID} />
    </>
  )
}

export default SingleBody;