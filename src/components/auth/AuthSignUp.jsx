import { useRef } from 'react';
import useValidate from '../../hooks/useValidate';
import { icons } from '../../constants';

const AuthSignUp = ({setIsSignIn}) => {
  const {inputData, handleDataValue, validateData} = useValidate({
    name: {value: '', error: false},
    email: {value: '', error: false},
    password: {value: '', error: false},
    avatar: {value: null, error: false}
  });
  const {name, email, password, avatar} = inputData;
  const imageAvatar = useRef(null);

  const handleAvatarSelect = e => {
    const el = e.currentTarget;
    if (el.files && el.files[0]) {
      const reader = new FileReader();

      reader.onload = e => {
        imageAvatar.current.src = e.target.result;
      }
      reader.readAsDataURL(el.files[0]);
    } else {
      imageAvatar.current.src = icons.uploadPlaceholder;
    }
    handleDataValue(e);
  }

  const handleSubmit = e => {
    e.preventDefault();
    validateData(signUpUser);
  }

  const signUpUser = () => {
    console.log('Sign Up');
  }

  return (
    <form>
      <div className={`form-group${ name.error ? ' has-error' : '' }`}>
        <h4>Full Name</h4>
        <p>Enter your name and surname</p>
        <input 
          type="text"
          name="name"
          className="form-control" 
          value={name.value}
          onChange={handleDataValue}
        />
        {name.error && <span className="form-control-error">{name.error}</span>}
      </div>
      <div className={`form-group${ email.error ? ' has-error' : '' }`}>
        <h4>Email</h4>
        <p>Enter your email</p>
        <input 
          type="email"
          name="email"
          className="form-control"
          value={email.value}
          onChange={handleDataValue}
        />
        {email.error && <span className="form-control-error">{email.error}</span>}
      </div>
      <div className={`form-group${ password.error ? ' has-error' : '' }`}>
        <h4>Password</h4>
        <p>Enter your password</p>
        <input 
          type="password"
          name="password"
          className="form-control"
          value={password.value}
          onChange={handleDataValue}
        />
        {password.error && <span className="form-control-error">{password.error}</span>}
      </div>
      <div className="form-group form-group-image">
        <h4>Profile Image</h4>
        <p>Choose image for your profile</p>
        <div>
          <img src={icons.uploadPlaceholder} alt="upload placeholder" ref={imageAvatar} />
          <input 
            type="file"
            name="avatar"
            onChange={handleAvatarSelect}
          />
          <p>{avatar.value?.name ?? 'No file chosen'}</p>
        </div>
      </div>
      <div className="container-actions">
        <div>
          <button type="button" className="btn btn-dk-blue">Cancel</button>
          <button 
            type="button" 
            className="btn btn-purple"
            onClick={handleSubmit}
            >
              Register
            </button>
        </div>
        <p>
          Already have an account?
          <span style={{marginLeft: '5px'}} onClick={() => setIsSignIn(true)}>
            Log in
          </span>
        </p>
      </div>
    </form>
  )
}

export default AuthSignUp;