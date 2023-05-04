import { Link } from 'react-router-dom';
// import userAvatar from '../../assets/user-images/image-user.jpg';
import userAvatar from '../../assets/user-images/image-user.jpg';

const GradientUserProfile = ({currentUser}) => {
  const {avatar} = currentUser;  

  return (
    <div>
      <img src={avatar || userAvatar} alt="user avatar" />
      <Link to="/profile">Visit profile</Link>
    </div>
  )
}

export default GradientUserProfile;