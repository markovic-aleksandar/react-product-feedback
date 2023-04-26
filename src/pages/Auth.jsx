import { AuthHeader, AuthForm } from '../components';

const Auth = () => {
  return (
    <div className="add-edit-container auth-container">
      <div style={{width: '100%'}}>
        <AuthHeader />
        <AuthForm />
      </div>
    </div>
  )
}

export default Auth;