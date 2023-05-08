import { createContext, useContext, useReducer } from 'react';
import comment_reducer from '../reducers/comment_reducer';
import * as actions from '../actions/comment_action';
import {
  collection,
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from './user_context';


const CommentContext = createContext();

const initState = {
  commentsLoading: false,
  comments: [],
}

const CommentProvider = ({children}) => {
  const [state, dispatch] = useReducer(comment_reducer, initState);
  const {currentUser} = useUserContext();

  const fetchComments = async feedbackId => {
    dispatch({type: actions.FETCH_BEGIN});
    try {
      const collectionRef = collection(db, 'comments');
      const q = query(collectionRef, where('feedback_ref', '==', feedbackId), orderBy('created_at', 'desc'));
      const data = await getDocs(q);
      const comments = data.docs.map(doc => ({...doc.data(), id: doc.id}));
      dispatch({type: actions.FETCH_SUCCESS, payload: comments});
    }
    catch(err) {
      console.log(err);
    }
  }

  // add comment
  const addComment = async (feedbackId, commentData) => {
    const {comment} = commentData;
    const {id, avatar, name} = currentUser;
    const collectionRef = collection(db, 'comments');
    const currentComment = {
      content: comment.value,
      feedback_ref: feedbackId,
      replies: [],
      user_ref: {
        id,
        avatar,
        name
      },
      created_at: serverTimestamp()
    }
    const {id: commentId} = await addDoc(collectionRef, currentComment);    
    dispatch({type: actions.ADD_COMMENT, payload: {...currentComment, id: commentId}});
  }

  return (
    <CommentContext.Provider value={{
      ...state,
      fetchComments,
      addComment
    }}>
      {children}
    </CommentContext.Provider>
  )
}

const useCommentContext = () => {
  return useContext(CommentContext);
}

export { CommentProvider, useCommentContext };

