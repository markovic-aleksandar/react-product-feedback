import { icons } from '../../constants';

const AuthForm = () => {
  return (
    <div className="container-body">
      <img src={icons.iconNewFeedback} alt="auth" />
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <h4>Full Name</h4>
          <p>Enter your name and surname</p>
          <input 
            type="text" 
            className="form-control"   
          />
        </div>
        <div className="form-group">
          <h4>Email</h4>
          <p>Enter your email</p>
          <input 
            type="email" 
            className="form-control"   
          />
        </div>
        <div className="form-group">
          <h4>Password</h4>
          <p>Enter your password</p>
          <input 
            type="password" 
            className="form-control"   
          />
        </div>
        <div className="form-group form-group-image">
          <h4>Profile Image</h4>
          <p>Choose image for your profile</p>
          <div>
            <img src={icons.uploadPlaceholder} alt="upload placeholder" />
            <input 
              type="file" 
            />
          </div>
        </div>
        <div className="container-actions">
          <div>
            <button type="button" className="btn btn-dk-blue">Cancel</button>
            <button type="button" className="btn btn-purple">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AuthForm;