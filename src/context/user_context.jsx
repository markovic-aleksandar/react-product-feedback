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
  updateDoc,
  serverTimestamp
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
import { handleErrorMessage } from '../utils';

const UserContext = createContext();

const initState = {
  currentUserLoading: true,
  currentUser: null
}

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(user_reducer, initState);

  const startUserLoading = () => {
    dispatch({type: actions.START_LOADING});
  }

  const endUserLoading = () => {
    dispatch({type: actions.END_LOADING});
  }

  const userSignUp = async userData => {
    const {name, email, password, avatar} = userData;
    // create auth user
    const {user} = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // document reference
    const docRef = doc(db, 'users', user.uid);
    // check if avatar is exists
    if (avatar.value) {
      uploadToStorage(avatar.value, async avatarValue => {
        const userObj = {
          name: name.value,
          email: email.value,
          avatar: avatarValue,
          votedFeedbacks: [],
          created_at: serverTimestamp()
        };
        await setDoc(docRef, userObj);
      });
    } else {
      await setDoc(docRef, {
        name: name.value,
        email: email.value,
        avatar: null,
        votedFeedbacks: [],
        created_at: serverTimestamp()
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
    
    startUserLoading();
    
    if (avatar.value?.size) {
      uploadToStorage(avatar.value, async avatarValue => {
        await updateDoc(docRef, {
          name: name.value,
          avatar: avatarValue
        });
        endUserLoading();
      });
    } else {
      await updateDoc(docRef, {
        name: name.value,
        avatar: avatar.value
      });
      dispatch({type: actions.END_LOADING});
      endUserLoading();
    }
  }

  const uploadToStorage = (file, successAction) => {
    const avatarRef = ref(storage, `$${uuidv4()}.${file.name}`);
    const uploadTask = uploadBytesResumable(avatarRef, file);
    uploadTask.on('state_changed', false, error => {
      console.log(error);
    }, async () => {
      const avatarValue = await getDownloadURL(uploadTask.snapshot.ref);
      successAction(avatarValue);
    })
  }

  const toggleVote = async id => {
    let {id: userId, voted_feedbacks} = state.currentUser;
    voted_feedbacks = voted_feedbacks.includes(id) ?
    voted_feedbacks.filter(voted_feedback => voted_feedback !== id) : [...voted_feedbacks, id];
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      voted_feedbacks
    });

    dispatch({type: actions.TOGGLE_VOTES, payload: voted_feedbacks});
  }

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
      endUserLoading,
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