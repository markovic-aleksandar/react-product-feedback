import Loading from './Loading';
import { useFeedbackContext } from '../context/feedback_context';

const RoadmapBoard = () => {
  const {feedbacksLoading, statuses} = useFeedbackContext();

  return (
    <div className="roadmap-board-holder">
      <div className="holder-header">
        <h3>Roadmap</h3>
        <button type="button" className="btn-roadmap-view">View</button>
      </div>
      <div className="holder-body">
        {feedbacksLoading ? (
          <Loading />
        ) : (
          <ul className="roadmap-list">
            {statuses.map((status, index) => {
              const {name, label, value, color} = status;
              return <li key={name} className="roadmap-list-item">
                <div className="list-item-info">
                  <span className="list-item-color" style={{backgroundColor: color}}></span>
                  <span className="list-item-name">{label}</span>
                </div>
                <span className="list-item-value">{value}</span>
              </li>
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RoadmapBoard;