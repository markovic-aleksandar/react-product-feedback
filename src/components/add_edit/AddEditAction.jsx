import { useNavigate } from 'react-router-dom';
import { useFeedbackContext } from '../../context/feedback_context';
import { handleErrorMessage } from '../../utils';
import { toast } from 'react-toastify';

const AddEditAction = ({feedbackId, inputData, validateData}) => {
  const {addFeedback, deleteFeedback, editFeedback} = useFeedbackContext();
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  // const handleAddEdit = () => {
  //   const {title: {value: title}, category: {value: category}, detail: {value: detail}} = inputData;

  //   const feedbackInfo = {
  //     title,
  //     category,
  //     description: detail
  //   };

  //   !feedbackId ? addFeedback(feedbackInfo) : editFeedback(feedbackId, {...feedbackInfo, status: inputData.status.value});
  //   goHome();
  // }

  const handleAddEdit = async () => {
    try {
      !feedbackId ? await addFeedback(inputData) : null;
      goHome();
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
  }

  const handleDelete = () => {
    deleteFeedback(feedbackId);
    goHome();
  }
  
  return (
    <div className={`container-actions${feedbackId ? ' actions-edit' : ''}`}>
      {feedbackId && <button 
        type="button" 
        className="btn btn-red"
        onClick={handleDelete}
      >Delete</button> }
      <div>
        <button 
          type="button" 
          className="btn btn-dk-blue" 
          onClick={() => navigate(-1)}
        >Cancel</button>
        {feedbackId ? 
          <button 
            type="button" 
            className="btn btn-purple"
            onClick={() => validateData(handleAddEdit)}  
          >Edit Feedback</button>
          :
          <button 
            type="button" 
            className="btn btn-purple"
            onClick={() => validateData(handleAddEdit)}
          >Add Feedback</button>
        }
      </div>
    </div>
  )
}

export default AddEditAction;