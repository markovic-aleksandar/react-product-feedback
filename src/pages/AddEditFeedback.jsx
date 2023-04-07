import { useParams } from 'react-router-dom';
import { Loading, AddEditHeader, AddEditBody } from '../components';
import { useFeedbackContext } from '../context/feedback_context';

const AddEditFeedback = () => {
  let {id} = useParams();
  id = Number(id) || id;
  const {feedbacksLoading, feedbacks} = useFeedbackContext();
  
  return (
    <div className="add-edit-container">
      <div style={{width: '100%'}}>
        <AddEditHeader />
        {feedbacksLoading ? (
          <Loading />
        ) : (
          <AddEditBody feedbackId={id} feedbacks={feedbacks} />
        )}
      </div>
    </div>
  )
}

export default AddEditFeedback;