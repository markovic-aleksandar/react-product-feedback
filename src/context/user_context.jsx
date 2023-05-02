import { useEffect, createContext, useContext, useReducer } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import user_reducer from '../reducers/user_reducer';
import * as actions from '../actions/user_action';
import { toast } from 'react-toastify';
import { getDataFromStorage, handleErrorMessage } from '../utils';

const UserContext = createContext();

const initState = {
  // currentUser: {
  //   image: 'image-user',
  //   name: 'John Doe',
  //   username: 'john.doe'
  // },
  currentUserLoading: true,
  currentUser: null,
  votedFeedbacks: getDataFromStorage('votedFeedbacks') ?? []
}

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(user_reducer, initState);

  const userSignUp = async userData => {
    const {name, email, password, avatar} = userData;
    const {user} = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, {
      name: name.value,
      email: email.value,
      avatar: avatar.value
    });
  }

  const userSignIn = async userData => {
    const {email, password} = userData;
    await signInWithEmailAndPassword(auth, email.value, password.value);
  }

  const userSignOut = async () => {
    try {
      await signOut(auth);
    }
    catch(err) {
      toast.error(handleErrorMessage(err.code));
    }
  }

  const toggleVote = id => {
    dispatch({type: actions.TOGGLE_VOTES, payload: id});
  }

  useEffect(() => {
    localStorage.setItem('votedFeedbacks', JSON.stringify(state.votedFeedbacks));
  }, [state.votedFeedbacks]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      let currentUser = null;

      if (user) {
        const {uid} = user;
        const docRef = doc(db, 'users', uid);
        const docUser = await getDoc(docRef);
        currentUser = {...docUser.data(), id: docUser.id};
      }
      
      dispatch({type: actions.FETCH_USER, payload: currentUser});
    });

    return () => unsub();
  }, []);

  return (
    <UserContext.Provider value={{
      ...state,
      userSignUp,
      userSignIn,
      userSignOut,
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