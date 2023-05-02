import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import Loading from '../Loading';
import GradientUserProfile from './GradientUserProfile';
import { images } from '../../constants';

const GradientBoard = () => {
  const {currentUserLoading, currentUser} = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="gradient-board-holder" style={{backgroundImage: `url(${(images.bckgHeaderDesktop)})`}}>
      <div className="holder-content">
        <div>
          <h2>Product Feedback</h2>
          <p>Feedback board</p>
        </div>
        <div className="user-holder">
          {currentUserLoading ? (
            <Loading />
          ) : !currentUser ? (
            <button 
              type="button" 
              className="btn btn-white" 
              onClick={() => navigate('/auth')}
            >Log in</button>
          ) : (
            <GradientUserProfile currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GradientBoard;