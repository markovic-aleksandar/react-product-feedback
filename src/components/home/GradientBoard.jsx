import { images } from '../../constants';

const GradientBoard = () => {

  return (
    <div className="gradient-board-holder" style={{backgroundImage: `url(${(images.bckgHeaderDesktop)})`}}>
      <div className="holder-content">
        <h2>Product Feedback</h2>
        <p>Feedback board</p>
      </div>
    </div>
  )
}

export default GradientBoard;