import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { Loading } from '../components';

const ProtectedRoute = ({isAuth, children}) => {
  const {currentUserLoading, currentUser} = useUserContext();  

  if (currentUserLoading) {
    return <Loading />
  }

  if (isAuth) {
    return currentUser ? <Navigate to="/" /> : children;
  }

  return currentUser ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;