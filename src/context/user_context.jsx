import { useEffect, createContext, useContext, useReducer } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import user_reducer from '../reducers/user_reducer';
import * as actions from '../actions/user_action';
import { v4 as uuidv4 } from 'uuid';
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
    // create auth user
    const {user} = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // document reference
    const docRef = doc(db, 'users', user.uid);
    // check if avatar is exists
    if (avatar.value) {
      const avatarRef = ref(storage, `$${uuidv4()}.${avatar.value.name}`);
      const uploadTask = uploadBytesResumable(avatarRef, avatar.value);
      uploadTask.on('state_changed', false, error => {
        console.log(error);
      }, async () => {
        avatar.value = await getDownloadURL(uploadTask.snapshot.ref);
        const userObj = {
          name: name.value,
          email: email.value,
          avatar: avatar.value
        };
        await setDoc(docRef, userObj);
      });
    } else {
      await setDoc(docRef, {
        name: name.value,
        email: email.value,
        avatar: null
      });
    }
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

  const userUpdate = async userData => {    
    const {name, avatar} = userData;
    const docRef = doc(db, 'users', state.currentUser.id);
    
    if (avatar.value?.size) {
      const avatarRef = ref(storage, `$${uuidv4()}.${avatar.value.name}`);
      const uploadTask = uploadBytesResumable(avatarRef, avatar.value);
      uploadTask.on('state_changed', false, error => {
        console.log(error);
      }, async () => {
        avatar.value = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(docRef, {
          name: name.value,
          avatar: avatar.value
        });
      });
    } else {
      await updateDoc(docRef, {
        name: name.value,
        avatar: avatar.value
      });
    }
  }

  const toggleVote = id => {
    dispatch({type: actions.TOGGLE_VOTES, payload: id});
  }

  useEffect(() => {
    localStorage.setItem('votedFeedbacks', JSON.stringify(state.votedFeedbacks));
  }, [state.votedFeedbacks]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        const {uid} = user;
        const docRef = doc(db, 'users', uid);
        const unsub = onSnapshot(docRef, snap => {
          if (snap.exists()) {
            const currentUser = {...snap.data(), id: uid};
            dispatch({type: actions.SET_USER, payload: currentUser});
          }
        });

        return unsub;
      } else {
        dispatch({type: actions.SET_USER, payload: null});
      }
    });

    return unsub;
  }, []);

  return (
    <UserContext.Provider value={{
      ...state,
      userSignUp,
      userSignIn,
      userSignOut,
      userUpdate,
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