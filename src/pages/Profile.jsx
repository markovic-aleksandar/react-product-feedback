import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { GoBack } from '../components';
import userAvatar from '../assets/user-images/image-user.jpg';

const Profile = () => {
  const {
    currentUser: {name, email, avatar}, 
    userSignOut
  } = useUserContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await userSignOut();
    navigate('/');
  }

  return (
    <div className="profile-container">
      <GoBack />
      <div className="container-holder">
        <div className="profile-image">
          <img src={avatar || userAvatar} alt="user avatar" />
          <input type="file" />
        </div>
        <div className="profile-info">
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
        <div className="profile-actions">
          <button type="button" className="btn btn-purple">Edit</button>
          <button 
            type="button" 
            className="btn btn-dk-blue"
            onClick={handleSignOut}  
          >Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;