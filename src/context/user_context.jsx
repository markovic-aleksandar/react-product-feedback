import { useEffect, createContext, useContext, useReducer } from 'react';
import user_reducer from '../reducers/user_reducer';
import * as actions from '../actions/user_action';
import { getDataFromStorage } from '../utils';

const UserContext = createContext();

const initState = {
  currentUser: {
    image: 'image-user',
    name: 'John Doe',
    username: 'john.doe'
  },
  votedFeedbacks: getDataFromStorage('votedFeedbacks') ?? []
}

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(user_reducer, initState);

  const toggleVote = id => {
    dispatch({type: actions.TOGGLE_VOTES, payload: id});
  }

  useEffect(() => {
    localStorage.setItem('votedFeedbacks', JSON.stringify(state.votedFeedbacks));
  }, [state.votedFeedbacks]);

  return (
    <UserContext.Provider value={{
      ...state,
      toggleVote
    }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };