import { useNavigate } from 'react-router-dom';
import { images } from '../../constants';

const GradientBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-board-holder" style={{backgroundImage: `url(${(images.bckgHeaderDesktop)})`}}>
      <div className="holder-content">
        <div>
          <h2>Product Feedback</h2>
          <p>Feedback board</p>
        </div>
        <div className="user-holder">
          <button 
            type="button" 
            className="btn btn-white" 
            onClick={() => navigate('/auth')}
          >Log in</button>
        </div>
      </div>
    </div>
  )
}

export default GradientBoard;