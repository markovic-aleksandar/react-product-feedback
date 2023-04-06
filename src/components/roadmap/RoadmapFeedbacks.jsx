import { useState, useEffect } from 'react';
import Loading from '../Loading';
import Message from '../Message';
import Feedback from '../Feedback';
import RoadmapMobileTabs from './RoadmapMobileTabs';
import RoadmapMobileFeedbacks from './RoadmapMobileFeedbacks';
import { useFeedbackContext } from '../../context/feedback_context';
import { contstant } from '../../constants';

const RoadmapFeedbacks = () => {
  const {feedbacksLoading, statuses} = useFeedbackContext();
  const [currentStatus, setCurrentStatus] = useState(statuses[0]);
  
  useEffect(() => {
    setCurrentStatus(statuses[0]);
  }, [statuses]);

  return (
    <div className="modal-body">
      {feedbacksLoading ? (
        <Loading />
      ) : (
        <>
          <RoadmapMobileTabs currentStatus={currentStatus} setCurrentStatus={setCurrentStatus} />

          <RoadmapMobileFeedbacks currentStatus={currentStatus} />

          <div className="feedback-statuses feedback-statuses-desktop">
            {statuses.map(status => {
              const {name, items} = status;
              const {label, desc, color} = contstant.feedbackStatuses.find(feedback => feedback.name === name);
              return <div key={status.name} className="feedback-status">
                <header className="status-info">
                  <h3>
                    {label}
                    <span className="status-count"> ({items.length})</span>
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
            })}
          </div>
        </>  
      )}
    </div>
  )
}

export default RoadmapFeedbacks;