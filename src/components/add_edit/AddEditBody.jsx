import AddEditAction from './AddEditAction';
import CustomSelect from '../CustomSelect';
import Message from '../Message';
import useValidate from '../../hooks/useValidate';
import { contstant, icons } from '../../constants';

const AddEditBody = ({feedbackId, feedbacks}) => {
  const categoryOptions = contstant.categories.map(category => category.label).filter(category => category !== 'All');
  const statusOptions = contstant.feedbackStatuses.map(status => status.label);
  const currentFeedback = feedbackId ? feedbacks.find(feedback => feedback.id === feedbackId) : null;
  
  // init input data
  const initInputData = {
    title: {value: currentFeedback?.title ?? '', error: false},
    category: {value: currentFeedback?.category ?? categoryOptions[0], error: false},
    detail: {value: currentFeedback?.description ?? '', error: false}
  };
  const {inputData, handleDataValue, validateData} = useValidate(
    currentFeedback ? {...initInputData, status: {value: currentFeedback.status, error: false}} : initInputData
  );

  const handleOptionCategoryClick = optionValue => {
    handleDataValue(undefined, 'category', optionValue);
  }

  const handleOptionStatusClick = optionValue => {
    handleDataValue(undefined, 'status', optionValue);
  }

  if (feedbackId && !currentFeedback) {
    return <Message message="You can't edit non-existing feedback." />
  }

  return (
    <div className="container-body">
      <img src={currentFeedback ? icons.iconEditFeedback : icons.iconNewFeedback} alt="add edit feedback" />
      <h2>{currentFeedback?.title ?? 'Create New Feedback'}</h2>
      <form>
        <div className={`form-group${ inputData.title.error ? ' has-error' : '' }`}>
          <h4>Feedback Title</h4>
          <p>Add a short, descriptive headline</p>
          <input 
            type="text"
            name="title" 
            className="form-control" 
            value={inputData.title.value}
            onChange={handleDataValue}
          />
          {inputData.title.error && <span className="form-control-error">The field can't be empty!</span>}
        </div>
        <div className="form-group">
          <h4>Category</h4>
          <p>Choose a category for your feedback</p>
          <CustomSelect 
            options={categoryOptions}
            currentOption={inputData.category.value}
            optionAction={handleOptionCategoryClick}
          />
        </div>
        {feedbackId && <div className="form-group">
          <h4>Update Status</h4>
          <p>Change feedback status</p>
          <CustomSelect 
            options={statusOptions}
            currentOption={inputData.status.value}
            optionAction={handleOptionStatusClick}
          />
        </div>}
        <div className={`form-group${ inputData.detail.error ? ' has-error' : '' }`}>
          <h4>Feedback Detail</h4>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea 
            name="detail"
            className="form-control" 
            value={inputData.detail.value}
            onChange={handleDataValue}
          ></textarea>
          {inputData.detail.error && <span className="form-control-error">The field can't be empty!</span>}
        </div>
        <AddEditAction feedbackId={feedbackId} inputData={inputData} validateData={validateData} />
      </form>
    </div>
  )
}

export default AddEditBody;