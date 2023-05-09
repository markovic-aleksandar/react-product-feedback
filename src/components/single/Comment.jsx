import { useState } from 'react';
import { useUserContext } from '../../context/user_context';
import { useCommentContext } from '../../context/comment_context';
import useValidate from '../../hooks/useValidate';
import { handleErrorMessage } from '../../utils';
import { toast } from 'react-toastify';
import userAvatar from '../../assets/user-images/image-user.jpg';

const Comment = ({parentId, id, content, user_ref:{avatar, name}, replyingTo}) => {
  const [commentReply, setCommentReply] = useState(false);
  const {currentUser} = useUserContext();
  const {addReplyComment} = useCommentContext();
  const {inputData, handleDataValue, validateData, resetData} = useValidate({comment: {value: '', error: false}});

  const postReplyComment = async () => {
    try {
      const commentData = {
        content: inputData.comment.value,
        parentId: parentId ?? id,
        replyingTo: name
      }
      await addReplyComment(commentData);
      setCommentReply(false);
      resetData();
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
  }

  return (
    <div className="comment">
      <div className="comment-user-reply">
        <div className="user-pic">
          <img src={avatar ? avatar : userAvatar} alt={name} />
        </div>
        <div className="user-info-reply">
          <div>
            <h4>{name}</h4>
          </div>
          {currentUser && (
            <button 
              type="button" 
              className="btn-reply" 
              onClick={() => setCommentReply(!commentReply)}
            >
              Reply
            </button>
          )}
        </div>
      </div>
      <p className="comment-content">
        {replyingTo && <span className="content-reply">{replyingTo} </span>}
        {content}
      </p>
      {currentUser && commentReply && <div className="comment-add-reply">
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