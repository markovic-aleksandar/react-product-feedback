import { useNavigate } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';

const SingleHeader = ({currentID}) => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <button 
        type="button" 
        className="btn-back"
        onClick={() => navigate('/')}  
      >
        <HiChevronLeft />
        Go Back
      </button>
      <button 
        type="button" 
        className="btn btn-blue btn-icon"
        onClick={() => navigate(`/add-edit/${currentID}`)}
      >
        Edit Feedback
      </button>
    </div>
  )
}

export default SingleHeader;