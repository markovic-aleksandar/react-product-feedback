import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import { HiChevronLeft, HiPlusSm } from 'react-icons/hi';

const RoadmapHeader = () => {
  const {currentUser} = useUserContext();
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
      {currentUser && (
        <button 
          type="button" 
          className="btn btn-purple btn-icon"
          onClick={() => navigate('/add-edit')}  
        >
          <HiPlusSm />
          Add Feedback
        </button>
      )}
    </div>
  )
}

export default RoadmapHeader;