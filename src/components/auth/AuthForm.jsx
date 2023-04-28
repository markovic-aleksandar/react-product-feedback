import { useState } from 'react';
import AuthSignIn from './AuthSignIn';
import AuthSignUp from './AuthSignUp';
import { icons } from '../../constants';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="container-body">
      <img src={icons.iconNewFeedback} alt="auth" />
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      {isSignIn ? <AuthSignIn setIsSignIn={setIsSignIn} /> : <AuthSignUp setIsSignIn={setIsSignIn} />}
    </div>
  )
}

export default AuthForm;