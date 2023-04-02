import { useNavigate } from 'react-router-dom';
import { HiChevronLeft, HiPlusSm } from 'react-icons/hi';

const RoadmapHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-header">
      <div>
        <button 
          type="button" 
          className="btn-back"
          onClick={() => navigate('/')}  
        >
          <HiChevronLeft />
          Go Back
        </button>
        <h1>Roadmap</h1>
      </div>
      <button type="button" className="btn btn-purple btn-icon">
        <HiPlusSm />
        Add Feedback
      </button>
    </div>
  )
}

export default RoadmapHeader;