import { useState } from 'react';
import { useUserContext } from '../context/user_context';
import { useFeedbackContext } from '../context/feedback_context';
import { handleErrorMessage } from '../utils';
import { toast } from 'react-toastify';
import { HiChevronUp } from 'react-icons/hi';
import { icons } from '../constants';

const Feedback = ({id, title, category, status, upvotes, description, comment_count, statusColor, handleFeedbackAction}) => {
  const {currentUser, toggleVote} = useUserContext();
  const {toggleFeedbackVote} = useFeedbackContext();
  const feedbackIsVoted = currentUser ? currentUser.voted_feedbacks.includes(id) : null;
  const [isVoting, setIsVoting] = useState(false);

  const handleToggleVote = async e => {
    e.stopPropagation();

    if (!currentUser || isVoting) {
      return;
    }

    setIsVoting(true);
    try {
      await toggleVote(id);
      await toggleFeedbackVote(id, feedbackIsVoted ? -1 : 1);
    }
    catch(err) {
      console.log(err);
      toast.error(handleErrorMessage(err.code));
    }
    finally {
      setIsVoting(false);
    }
  }

  return (
    <article 
      className={`feedback-holder${statusColor ? ' feedback-holder-status' : ''}`}
      onClick={() => handleFeedbackAction ? handleFeedbackAction(id) : null}
    >
      <div className="holder-content">
        {statusColor && <>
          <div className="status-line" style={{background: statusColor}}></div>
          <p>
            <span className="status-color" style={{background: statusColor}}></span>
            {status}
          </p>
        </>}
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="flag">{category}</span>
      </div>
      <div className="holder-manage">
        <button 
          type="button" 
          className={`vote-btn flag${ feedbackIsVoted ? ' active' : '' }`} 
          onClick={handleToggleVote}
        >
          <HiChevronUp />
          {upvotes}
        </button>
        <span className="comment-count">
          <img src={icons.iconComments} alt="comment" />
          {comment_count}
        </span>
      </div>
    </article>
  )
}

export default Feedback;