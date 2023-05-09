import Message from '../Message';
import Feedback from '../Feedback';
import Comments from './Comments';
import AddComment from './AddComment';
import { useUserContext } from '../../context/user_context';
import { useFeedbackContext } from '../../context/feedback_context';

const SingleBody = ({currentID}) => {
  const {currentUser} = useUserContext();
  const {feedbacks} = useFeedbackContext();
  const currentFeedback = feedbacks.find(feedback => feedback.id === currentID && feedback.status === 'suggestion');
  
  if (!currentFeedback) {
    return <Message message="This feedback is non-existing." />
  }
  
  return (
    <>
      <Feedback {...currentFeedback} />
      <Comments feedbackId={currentID} />
      {currentUser && <AddComment feedbackId={currentID} />}
    </>
  )
}

export default SingleBody;