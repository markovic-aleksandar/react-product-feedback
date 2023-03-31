import { HiChevronUp } from 'react-icons/hi';
import { icons } from '../constants';

const Feedback = ({id, title, category, upvotes, description, comments}) => {
  
  return (
    <article className="feedback-holder">
      <div className="holder-content">
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