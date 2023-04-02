import { useFeedbackContext } from '../../context/feedback_context';
import { contstant } from '../../constants';

const RoadmapMobileTabs = ({currentStatus, setCurrentStatus}) => {
  const {statuses} = useFeedbackContext();

  return (
    <div className="feedback-statuses-filter">
      {statuses.map(status => {
        const {name, items} = status;
        const {color} = contstant.feedbackStatuses.find(feedback => feedback.name === name);
        return <button 
          key={name} 
          className={`btn-status-filter${currentStatus.name === name ? ' active' : ''}`}
          onClick={() => setCurrentStatus(status)}
        >
          {`${name} (${items.length})`}
          <span className="status-line" style={{background: color}}></span>
        </button>
      })}
    </div>
  )
}

export default RoadmapMobileTabs;