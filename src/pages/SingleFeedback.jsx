import { useParams } from 'react-router-dom';
import { Loading, SingleHeader, SingleBody } from '../components';
import { useFeedbackContext } from '../context/feedback_context';


const SingleFeedback = () => {
  const {id} = useParams();
  const {feedbacksLoading} = useFeedbackContext();

  return (
    <div className="single-feedback-container">
      <SingleHeader currentID={id} />
      {feedbacksLoading ? (
        <Loading />
      ) : (
        <SingleBody currentID={id} />
      )}
    </div>
  )
}

export default SingleFeedback;