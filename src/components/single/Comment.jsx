import { useState, useEffect } from 'react';
import { useFeedbackContext } from '../../context/feedback_context';
import useValidate from '../../hooks/useValidate';
import { getUserImages, validateInputData } from "../../utils";

const Comment = ({id, parentId, content, user:{image, name, username}, replyingTo, feedbackId}) => {
  const [userImages, setUserImages] = useState(null);
  const [commentReply, setCommentReply] = useState(false);
  // const [inputData, setInputData] = useState({
  //   reply: {
  //     value: '',
  //     error: ''
  //   }
  // });
  const {addReplyComment} = useFeedbackContext();

  const {inputData, handleDataValue, validateData} = useValidate({comment: {value: '', error: false}});

  console.log(inputData);
  

  // const handleInputValue = e => {
  //   const name = e.currentTarget.name;
  //   const value = e.currentTarget.value;
  //   setInputData(prevData => ({...prevData, [name]: {...prevData[name], value}}));
  // }

  const postReplyComment = () => {
    const {dataItems, error} = validateInputData(inputData);
    setInputData(dataItems);
    if (!error) {
      const commentInfo = {
        feedbackId,
        parentId: parentId || id,
        content: inputData.reply.value,
        replyingTo: username
      };
      addReplyComment(commentInfo);
      setCommentReply(false);
    }
  }

  useEffect(() => {
    getUserImages(import.meta.glob('../../assets/user-images/*'))
    .then(response => setUserImages(response));
  }, []);

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
            name="reply"
            className="comment-add-reply-textarea form-control"
            placeholder="Type your reply here"
            // value={inputData.reply.value}
            // onChange={handleInputValue}
            value={inputData.comment.value}
            onChange={handleDataValue}  
          ></textarea>
          {inputData.comment.error && <span className="form-control-error">The field can't be empty!</span>}
        </div>
        <div className="comment-add-reply-post">
          <button 
            type="button" 
            className="btn btn-purple"
            // onClick={postReplyComment}
            onClick={validateData}
          >Post Reply</button>
        </div>
      </div>}
    </div>
  )
}

export default Comment;