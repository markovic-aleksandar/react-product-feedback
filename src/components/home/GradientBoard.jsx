import { images } from '../../constants';

const GradientBoard = () => {

  return (
    <div className="gradient-board-holder" style={{backgroundImage: `url(${(images.bckgHeaderDesktop)})`}}>
      <div className="holder-content">
        <div>
          <h2>Product Feedback</h2>
          <p>Feedback board</p>
        </div>
        <div className="user-holder">
          <button type="button" className="btn btn-white">Log in</button>
        </div>
      </div>
    </div>
  )
}

export default GradientBoard;