import Message from '../Message';
import Feedback from '../Feedback';
import { contstant } from '../../constants';

const RoadmapMobileFeedbacks = ({currentStatus}) => {
  const {name, items} = currentStatus;
  const {label, desc, color} = contstant.feedbackStatuses.find(feedback => feedback.name === name);

  return (
    <div className="feedback-statuses feedback-statuses-mobile">
      <div className="feedback-status">
        <header className="status-info">
          <h3>
            {label}
            <span className="status-count">({items.length})</span>
          </h3>
          <p>{desc}</p>
        </header>
        <div className="status-items">
        {items.length < 1 ? (
          <Message message="No items to show" />
        ) : (
          items.map(item => {
            return <Feedback key={item.id} statusColor={color} {...item} />
          })
        )}
        </div>
      </div>
    </div>
  )
}

export default RoadmapMobileFeedbacks;