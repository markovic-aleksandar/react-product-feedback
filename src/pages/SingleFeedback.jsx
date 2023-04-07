import { useParams } from 'react-router-dom';
import { Loading, SingleHeader, SingleBody } from '../components';
import { useFeedbackContext } from '../context/feedback_context';


const SingleFeedback = () => {
  let {id} = useParams();
  id = Number(id) || id;
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