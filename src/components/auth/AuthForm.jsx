import { useState } from 'react';
import { Link } from 'react-router-dom';
import useValidate from '../../hooks/useValidate';
import { icons } from '../../constants';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const {inputData, handleDataValue, validateData} = useValidate({
    name: {value: '', error: false},
    email: {value: '', error: false},
    password: {value: '', error: false},
    avatar: {value: null, error: false}
  });
  const {name, email, password, avatar} = inputData;
  const [image, setImage] = useState('No file chosen');

  const handleSubmit = e => {
    e.preventDefault();
    validateData(() => console.log('sad'));
  }

  return (
    <div className="container-body">
      <img src={icons.iconNewFeedback} alt="auth" />
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      <form>
        {!isSignIn && <div className="form-group">
          <h4>Full Name</h4>
          <p>Enter your name and surname</p>
          <input 
            type="text"
            name="name"
            className="form-control" 
            value={name.value}
            onChange={handleDataValue}
          />
        </div>}
        <div className="form-group">
          <h4>Email</h4>
          <p>Enter your email</p>
          <input 
            type="email"
            name="email"
            className="form-control"
            value={email.value}
            onChange={handleDataValue}
          />
        </div>
        <div className="form-group">
          <h4>Password</h4>
          <p>Enter your password</p>
          <input 
            type="password"
            name="password"
            className="form-control"
            value={password.value}
            onChange={handleDataValue}
          />
        </div>
        {!isSignIn && <div className="form-group form-group-image">
          <h4>Profile Image</h4>
          <p>Choose image for your profile</p>
          <div>
            <img src={icons.uploadPlaceholder} alt="upload placeholder" />
            <input 
              type="file"
              name="avatar"
              onChange={handleDataValue}
            />
            <p>{avatar.value?.name ?? 'No file chosen'}</p>
          </div>
        </div>}
        <div className="container-actions">
          <div>
            <button type="button" className="btn btn-dk-blue">Cancel</button>
            <button 
              type="button" 
              className="btn btn-purple"
              onClick={handleSubmit}
              >
                {isSignIn ? 'Log in' : 'Register'}
              </button>
          </div>
          <p>
            {isSignIn ? 'Don\'t have an account yet?' : 'Already have an account?'}
            <span onClick={() => setIsSignIn(!isSignIn)}> 
              {isSignIn ? ' Register' : ' Log in'}
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default AuthForm;