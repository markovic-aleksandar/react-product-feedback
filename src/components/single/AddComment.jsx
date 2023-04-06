import { useState, useEffect } from 'react';
import { useFeedbackContext } from "../../context/feedback_context";
import useValidate from '../../hooks/useValidate';

const AddComment = ({feedbackId}) => {
  const {inputData, handleDataValue, validateData, resetData} = useValidate({comment: {value: '', error: false}});
  const {addComment} = useFeedbackContext();
  const [characterLeft, setCharacterLeft] = useState(0);

  const handleInputValue = e => {
    let value = e.target.value;

    if (value.length >= 250) {
      value = value.slice(0, 250);
    }

    handleDataValue(e, value);
  }

  const postComment = () => {
    const commentInfo = {
      feedbackId,
      content: inputData.comment.value
    };
    addComment(commentInfo);
    resetData();
  }

  useEffect(() => {
    setCharacterLeft(inputData.comment.value.length);
  }, [inputData.comment.value]);
  
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
          {characterLeft < 250 ? 
            <p className="comment-char-left">
              {250 - characterLeft} Characters Left
            </p>
            :  
            <p className="comment-char-left limit">
              Reached the character limit
            </p>
          }
          <button type="button" className="btn btn-purple" onClick={() => validateData(postComment)}>Post Comment</button>
        </div>
      </form>
    </div>
  )
}

export default AddComment;