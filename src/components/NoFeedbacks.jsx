import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { HiPlusSm } from 'react-icons/hi';
import { icons } from '../constants';

const NoFeedbacks = () => {
  const {currentUser} = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="empty-content-illustration">
      <img src={icons.illustrationEmpty} alt="illustration empty" />
      <h1>There is no feedback yet.</h1>
      <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
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

export default NoFeedbacks;