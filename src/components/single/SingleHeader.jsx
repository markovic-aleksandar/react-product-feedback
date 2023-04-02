import { useNavigate } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';

const SingleHeader = () => {
  const navigate = useNavigate('/');

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
      <button type="button" className="btn btn-blue btn-icon">
        Edit Feedback
      </button>
    </div>
  )
}

export default SingleHeader;