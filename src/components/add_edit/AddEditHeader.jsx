import { HiChevronLeft } from 'react-icons/hi';

const AddEditHeader = () => {
  return (
    <div className="container-header">
      <button 
        type="button" 
        className="btn-back"
      >
        <HiChevronLeft />
        Go Back
      </button>
    </div>
  )
}

export default AddEditHeader;