import AddEditAction from './AddEditAction';
import { icons } from '../../constants';

const AddEditBody = () => {
  return (
    <div className="container-body">
      <img src={icons.iconNewFeedback} alt="new feedback" />
      <h2>Create New Feedback</h2>
      <form>
        <div className="form-group">
          <h4>Feedback Title</h4>
          <p>Add a short, descriptive headline</p>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <h4>Category</h4>
          <p>Choose a category for your feedback</p>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <h4>Feedback Detail</h4>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea className="form-control"></textarea>
        </div>
        <AddEditAction />
      </form>
    </div>
  )
}

export default AddEditBody;