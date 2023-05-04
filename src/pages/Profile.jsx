import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import useValidate from '../hooks/useValidate';
import { showSelectedAvatar, handleErrorMessage } from '../utils';
import { GoBack } from '../components';
import { toast } from 'react-toastify';
import { FaExchangeAlt } from 'react-icons/fa';
import userAvatar from '../assets/user-images/image-user.jpg';

const Profile = () => {
  const {
    currentUser: {name, email, avatar}, 
    userSignOut,
    userUpdate
  } = useUserContext();
  const [isEdit, setIsEdit] = useState(false);
  const {inputData, setInputData, handleDataValue, validateData} = useValidate({
    name: {value: name, error: false},
    avatar: {value: avatar, error: false}
  });
  const navigate = useNavigate();
  const avatarRef = useRef();

  const handleSignOut = async () => {
    await userSignOut();
    navigate('/');
  }

  const handleAvatarSelect = e => {
    showSelectedAvatar(e.currentTarget, avatarRef.current, userAvatar);
    handleDataValue(e);
  }

  const handleUpdate = async () => {
    try {
      await userUpdate(inputData);
      setIsEdit(false);
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
  }

  const handleCancelEdit = () => {
    setIsEdit(false);
    setInputData({
      name: {value: name, error: false},
      avatar: {value: avatar, error: false}
    });
    avatarRef.current.src = avatar;
  }

  return (
    <div className="profile-container">
      <GoBack />
      <div className="container-holder">
        <div className="profile-image">
          <img src={avatar || userAvatar} alt="user avatar" ref={avatarRef} />
          {isEdit && <div className="profile-image-edit">
            <FaExchangeAlt />
            <input 
              type="file" 
              name="avatar"
              onChange={handleAvatarSelect}
            />
          </div>}
        </div>
        <div className={`profile-info${ isEdit ? ' profile-info-edit' : '' }`}>
          {isEdit ? 
            <div className="form-group">
              <h4>Your Name</h4>
              <p>Change your name</p>
              <input 
                type="text"
                name="name" 
                value={inputData.name.value} 
                className="form-control"
                onChange={handleDataValue}
              />
            </div>
            :
            <h3>{name}</h3>
          }
          <p>{email}</p>
        </div>
        <div className="profile-actions">
          {isEdit ? 
            <>
              <button 
                type="button" 
                className="btn btn-purple"
                onClick={() => validateData(handleUpdate)}
                >Save</button>
              <button 
                type="button"
                className="btn btn-dk-blue"
                onClick={handleCancelEdit}
              >Cancel</button>
            </>
            :
            <>
              <button 
                type="button" 
                className="btn btn-purple"
                onClick={() => setIsEdit(true)}  
              >Edit</button>
              <button 
                type="button" 
                className="btn btn-dk-blue"
                onClick={handleSignOut}  
              >Log out</button>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile;