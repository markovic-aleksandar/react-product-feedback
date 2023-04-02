import { getUserImages } from "../../utils";

const Comment = ({id, content, user:{image, name, username}}) => {  
  const userImages = getUserImages(import.meta.glob('../../assets/user-images/*'));
  console.log(userImages);
  
  return (
    <div className="comment">
      <div className="comment-user-reply">
        <div className="user-pic">
          <img src={userImages[image]} alt={name} />
        </div>
        <div className="user-info-reply">
          <div>
            <h4>{name}</h4>
            <p>@{username}</p>
          </div>
          <button type="button" className="btn-reply">Reply</button>
        </div>
      </div>
      <p className="comment-content">
        {/* reply ovde */}
        {content}
      </p>
    </div>
  )
}

export default Comment;