import { GoBack } from '../components';
import userAvatar from '../assets/user-images/image-user.jpg';

const Profile = () => {
  return (
    <div className="profile-container">
      <GoBack />
      <div className="container-holder">
        <div className="profile-image">
          <img src={userAvatar} alt="user avatar" />
          <input type="file" />
        </div>
        <div className="profile-info">
          <h3>Aleksandar Markovic</h3>
          <p>aleksandar97kg@gmail.com</p>
        </div>
        <div className="profile-actions">
          <button type="button" className="btn btn-purple">Edit</button>
          <button type="button" className="btn btn-dk-blue">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;