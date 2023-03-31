import { HiPlusSm } from 'react-icons/hi';
import { icons } from '../constants';


const NoFeedbacks = () => {
  return (
    <div className="empty-content-illustration">
      <img src={icons.illustrationEmpty} alt="illustration empty" />
      <h1>There is no feedback yet.</h1>
      <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
      <button type="button" className="btn btn-purple btn-icon">
        <HiPlusSm />
        Add Feedback
      </button>
    </div>
  )
}

export default NoFeedbacks;