import { createContext, useContext, useReducer } from 'react';
import comment_reducer from '../reducers/comment_reducer';
import * as actions from '../actions/comment_action';
import {
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from './user_context';
import { useFeedbackContext } from './feedback_context';
import { v4 as uuidv4 } from 'uuid';

const CommentContext = createContext();

const initState = {
  commentsLoading: false,
  comments: []
}

const CommentProvider = ({children}) => {
  const [state, dispatch] = useReducer(comment_reducer, initState);
  const {currentUser} = useUserContext();
  const {incFeedbackCommentCount} = useFeedbackContext();

  const fetchComments = async feedbackId => {
    dispatch({type: actions.FETCH_BEGIN});
    try {
      const collectionRef = collection(db, 'comments');
      const q = query(collectionRef, where('feedback_ref', '==', feedbackId), orderBy('created_at', 'desc'));
      const data = await getDocs(q);
      let comments = data.docs.map(doc => ({...doc.data(), id: doc.id}));
      if (comments.length > 0) {
        let commentsUser = [];
        comments.forEach(comment => {
          const {user_ref, replies} = comment;
          commentsUser.push(user_ref);
          replies.forEach(reply => commentsUser.push(reply.user_ref));
        });
        commentsUser = [...new Set(commentsUser)];        
        const userDocs = commentsUser.map(commentUser => doc(db, 'users', commentUser));
        const usersData = await Promise.all(userDocs.map(userDoc => getDoc(userDoc)));    
        let users = [];
        usersData.forEach(userData => {
          if (userData.exists()) {
            users.push({...userData.data(), id: userData.id});
          }
        });
        comments = comments.map(comment => {
          const {user_ref} = comment;
          const {id, avatar, name} = users.find(user => user.id === user_ref);
          const userInfo = {
            id,
            avatar,
            name
          };
          const replies = comment.replies.map(commentReply => {
            const {user_ref} = commentReply;
            const {id, avatar, name} = users.find(user => user.id === user_ref);
            const userInfo = {
              id,
              avatar,
              name
            };
            return {...commentReply, user_ref: userInfo};
          });
          return {
            ...comment,
            user_ref: userInfo,
            replies
          };
        });
      }
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
      user_ref: id,
      created_at: serverTimestamp()
    }
    const {id: commentId} = await addDoc(collectionRef, currentComment);
    await incFeedbackCommentCount(feedbackId);
    dispatch({type: actions.ADD_COMMENT, payload: {...currentComment, user_ref: {id, avatar, name}, id: commentId}});
  }

  // add reply comment
  const addReplyComment = async commentData => {
    const {parentId, content, replyingTo} = commentData;
    const {id, avatar, name} = currentUser;
    const currentComment = {
      id: uuidv4(),
      content,
      replyingTo,
      user_ref: id,
      created_at: new Date()
    }
    const docRef = doc(db, 'comments', parentId);
    const parentComment = state.comments.find(comment => comment.id === parentId);
    const parentCommentReplies = [
      ...parentComment.replies.map(reply => ({...reply, user_ref: reply.user_ref.id})),
      currentComment
    ];
    
    await updateDoc(docRef, {
      replies: parentCommentReplies
    });
    dispatch({type: actions.ADD_REPLY_COMMENT, payload: {id: parentId, replies: [...parentComment.replies, {...currentComment, user_ref: {id, avatar, name}}]}});
  }

  return (
    <CommentContext.Provider value={{
      ...state,
      fetchComments,
      addComment,
      addReplyComment
    }}>
      {children}
    </CommentContext.Provider>
  )
}

const useCommentContext = () => {
  return useContext(CommentContext);
}

export { CommentProvider, useCommentContext };