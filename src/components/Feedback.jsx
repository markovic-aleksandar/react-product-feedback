import { HiChevronUp } from 'react-icons/hi';
import { icons } from '../constants';

const Feedback = ({id, title, category, status, upvotes, description, comments, statusColor, handleFeedbackAction}) => {
  
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
        <button type="button" className="vote-btn flag">
          <HiChevronUp />
          {upvotes}
        </button>
        <span className="comment-count">
          <img src={icons.iconComments} alt="comment" />
          {comments ? comments.length : 0}
        </span>
      </div>
    </article>
  )
}

export default Feedback;