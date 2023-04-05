import { createContext, useContext, useReducer } from 'react';
import user_reducer from '../reducers/user_reducer';

const UserContext = createContext();

const initState = {
  currentUser: {
    image: 'image-user',
    name: 'John Doe',
    username: 'john.doe'
  }
}

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(user_reducer, initState);

  return (
    <UserContext.Provider value={{
      ...state
    }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };