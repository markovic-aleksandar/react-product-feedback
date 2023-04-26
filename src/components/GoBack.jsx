import { useNavigate } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div className="container-header">
      <button
        type="button"
        className="btn-back"
        onClick={() => navigate(-1)}
      >
        <HiChevronLeft />
        Go Back
      </button>
    </div>
  )
}

export default GoBack;