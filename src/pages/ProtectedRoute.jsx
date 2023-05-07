import { Navigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { useFeedbackContext } from '../context/feedback_context';
import { Loading } from '../components';

const ProtectedRoute = ({isAuth, isEdit, children}) => {
  const {currentUserLoading, currentUser} = useUserContext();
  const {feedbacksLoading, feedbacks} = useFeedbackContext();  
  const params = useParams();

  if (currentUserLoading || feedbacksLoading) {
    return <Loading />;
  }

  if (isAuth) {
    return currentUser ? <Navigate to="/" /> : children;
  }

  if (isEdit) {
    const {id} = params;
    const currentUserOwnedFeedack = feedbacks.find(feedback => feedback.id === id && feedback.user_ref === currentUser?.id);
    return currentUserOwnedFeedack ? children : <Navigate to="/auth" />;
  }

  return currentUser ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;