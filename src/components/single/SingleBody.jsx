import Message from '../Message';
import Feedback from '../Feedback';
import Comments from './Comments';
import AddComment from './AddComment';
import { useFeedbackContext } from '../../context/feedback_context';

const SingleBody = ({currentID}) => {
  const {feedbacks} = useFeedbackContext();
  const currentFeedback = feedbacks.find(feedback => feedback.id === currentID && feedback.status === 'suggestion');
  
  if (!currentFeedback) {
    return <Message message="This feedback is non-existing." />
  }
  
  // const comments = currentFeedback.comments ? currentFeedback.comments : [];
  return (
    <>
      <Feedback {...currentFeedback} />
      <Comments feedbackId={currentID} />
      <AddComment feedbackId={currentID} />
    </>
  )
}

export default SingleBody;