import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/user_context';
import useValidate from '../../hooks/useValidate';
import { toast } from 'react-toastify';
import { handleErrorMessage } from '../../utils';

const AuthSignIn = ({setIsSignIn}) => {
  const {userSignIn} = useUserContext();
  const {inputData, handleDataValue, validateData} = useValidate({
    email: {value: '', error: false},
    password: {value: '', error: false}
  });
  const {email, password} = inputData;
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    validateData(handleSignIn);
  }

  const handleSignIn = async () => {
    try {
      await userSignIn(inputData);
      navigate('/profile');
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
  }

  return (
    <form>
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
      <div className="container-actions">
        <div>
          <button type="button" className="btn btn-dk-blue">Cancel</button>
          <button 
            type="button" 
            className="btn btn-purple"
            onClick={handleSubmit}
            >
            Log in
            </button>
        </div>
        <p>
          Don't have an account yet?
          <span style={{marginLeft: '5px'}} onClick={() => setIsSignIn(false)}> 
            Register
          </span>
        </p>
      </div>
    </form>
  )
}

export default AuthSignIn;