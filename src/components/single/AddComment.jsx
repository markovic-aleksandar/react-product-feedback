import { useState, useEffect } from 'react';
import { useCommentContext } from '../../context/comment_context';
import useValidate from '../../hooks/useValidate';
import { handleErrorMessage } from '../../utils';
import { toast } from 'react-toastify';

const AddComment = ({feedbackId}) => {
  const {inputData, handleDataValue, validateData, resetData} = useValidate({comment: {value: '', error: false}});
  const {addComment} = useCommentContext();
  const [characterLeft, setCharacterLeft] = useState(0);

  const handleInputValue = e => {
    const name = e.target.name;
    let value = e.target.value;

    if (value.length >= 250) {
      value = value.slice(0, 250);
    }

    handleDataValue(undefined, name, value);
  }

  const postComment = async () => {
    try {
      addComment(feedbackId, inputData);
      resetData();
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
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
          {inputData.comment.error && <span className="form-control-error">{inputData.comment.error}</span>}
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