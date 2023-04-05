// potreban je bolji nacin validacije ovo ne valja
// takodje bi valjalo da imas neku f-ju koja ce isparzniti sva state polja
// (mozda bolje samo ona koja su koriscena), 
// jer kod reply nije dobvoljno da zatvoris taj prozor ostaje vrednost

import { useState } from 'react';
import { useFeedbackContext } from "../../context/feedback_context";
import { validateInputData } from '../../utils';

const AddComment = ({feedbackId}) => {
  const [inputData, setInputData] = useState({
    comment: {
      value: '',
      error: false
    }
  });
  const {addComment} = useFeedbackContext();

  const handleInputValue = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputData(prevData => ({...prevData, [name]: {...prevData[name], value}}));
  }

  const postComment = () => {
    const {dataItems, error} = validateInputData(inputData);
    setInputData(dataItems);
    if (!error) {
      const commentInfo = {
        feedbackId,
        content: inputData.comment.value
      };
      addComment(commentInfo);
    }
  }
  
  return (
    <div className="comment-add">
      <h3>Add Comment</h3>
      <form>
        <div className={`form-group${inputData.comment.error ? ' has-error' : ''}`}>
          <textarea
            name="comment"
            className="comment-add-textarea form-control" 
            placeholder="Type your comment here"
            value={inputData.comment.value}
            onChange={handleInputValue}
          ></textarea>
          {inputData.comment.error && <span className="form-control-error">The field can't be empty!</span>}
        </div>
        <div>
          <p className="comment-char-left">
            250 Characters Left
          </p>
          <button type="button" className="btn btn-purple" onClick={postComment}>Post Comment</button>
        </div>
      </form>
    </div>
  )
}

export default AddComment;