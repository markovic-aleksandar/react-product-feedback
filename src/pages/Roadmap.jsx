import { RoadmapHeader, RoadmapFeedbacks } from '../components';

const Roadmap = () => {
  return (
    <div className="roadmap-container">
      <div className="modal-content">
        <RoadmapHeader />
        <RoadmapFeedbacks />
      </div>
    </div>
  )
}

export default Roadmap;