import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useFeedbackContext } from '../context/feedback_context';
import { contstant } from '../constants';

const RoadmapBoard = () => {
  const {feedbacksLoading, statuses} = useFeedbackContext();
  const navigate = useNavigate();

  return (
    <div className="roadmap-board-holder">
      <div className="holder-header">
        <h3>Roadmap</h3>
        <button type="button" className="btn-roadmap-view" onClick={() => navigate('/roadmap')}>View</button>
      </div>
      <div className="holder-body">
        {feedbacksLoading ? (
          <Loading />
        ) : (
          <ul className="roadmap-list">
            {statuses.map(status => {
              const {name, items} = status;
              const {label, color} = contstant.feedbackStatuses.find(feedback => feedback.name === name);
              return <li key={name} className="roadmap-list-item">
                <div className="list-item-info">
                  <span className="list-item-color" style={{backgroundColor: color}}></span>
                  <span className="list-item-name">{label}</span>
                </div>
                <span className="list-item-value">{items.length}</span>
              </li>
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RoadmapBoard;