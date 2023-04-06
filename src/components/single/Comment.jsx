import { useState, useEffect } from 'react';
import { useFeedbackContext } from '../../context/feedback_context';
import useValidate from '../../hooks/useValidate';
import { getUserImages, validateInputData } from "../../utils";

const Comment = ({id, parentId, content, user:{image, name, username}, replyingTo, feedbackId}) => {
  const [userImages, setUserImages] = useState(null);
  const [commentReply, setCommentReply] = useState(false);
  const {addReplyComment} = useFeedbackContext();
  const {inputData, handleDataValue, validateData, resetData} = useValidate({comment: {value: '', error: false}});

  const postReplyComment = () => {
    const commentInfo = {
      feedbackId,
      parentId: parentId || id,
      content: inputData.comment.value,
      replyingTo: username
    };
    addReplyComment(commentInfo);
    setCommentReply(false);
    resetData();
  }

  useEffect(() => {
    getUserImages(import.meta.glob('../../assets/user-images/*'))
    .then(response => setUserImages(response));
  }, []);

  // console.log(inputData.comment.error);

  return (
    <div className="comment">
      <div className="comment-user-reply">
        <div className="user-pic">
          {userImages && <img src={userImages[image]} alt={name} />}
        </div>
        <div className="user-info-reply">
          <div>
            <h4>{name}</h4>
            <p>@{username}</p>
          </div>
          <button 
            type="button" 
            className="btn-reply" 
            onClick={() => setCommentReply(!commentReply)}
          >
            Reply
          </button>
        </div>
      </div>
      <p className="comment-content">
        {replyingTo && <span className="content-reply">{replyingTo} </span>}
        {content}
      </p>
      {commentReply && <div className="comment-add-reply">
        <div className={`form-group${inputData.comment.error ? ' has-error' : ''}`}>
          <textarea 
            name="comment"
            className="comment-add-reply-textarea form-control"
            placeholder="Type your reply here"
            value={inputData.comment.value}
            onChange={handleDataValue}  
          ></textarea>
          {inputData.comment.error && <span className="form-control-error">The field can't be empty!</span>}
        </div>
        <div className="comment-add-reply-post">
          <button 
            type="button" 
            className="btn btn-purple"
            onClick={() => validateData(postReplyComment)}
          >Post Reply</button>
        </div>
      </div>}
    </div>
  )
}

export default Comment;