import { useParams } from 'react-router-dom';
import { Loading, SingleHeader, SingleBody } from '../components';
import { useUserContext } from '../context/user_context';
import { useFeedbackContext } from '../context/feedback_context';


const SingleFeedback = () => {
  let {id} = useParams();
  id = Number(id) || id;
  const {currentUserLoading} = useUserContext();
  const {feedbacksLoading} = useFeedbackContext();

  return (
    <div className="single-feedback-container">
      {currentUserLoading || feedbacksLoading ? (
        <Loading />
      ) : (
        <>
          <SingleHeader currentID={id} />
          <SingleBody currentID={id} />
        </>
      )}
    </div>
  )
}

export default SingleFeedback;