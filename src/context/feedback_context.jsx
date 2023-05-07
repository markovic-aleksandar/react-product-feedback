import { useEffect, createContext, useContext, useReducer } from 'react';
import { useUserContext } from '../context/user_context';
import { v4 as uuidv4 } from 'uuid';
import {
  doc,
  collection, 
  addDoc, 
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase'; 
import feedback_reducer from '../reducers/feedback_reducer';
import * as actions from '../actions/feedback_action';

const FeedbackContext = createContext();

const initState = {
  feedbacksLoading: true,
  feedbacksError: false,
  feedbacks: [],
  suggestedFeedbacks: [],
  currentSort: 'Most Upvotes',
  currentCategory: 'all',
  statuses: [
    {
      name: 'planned',
      items: []
    },
    {
      name: 'in-progress',
      items: []
    },
    {
      name: 'live',
      items: []
    }
  ]
}

const FeedbackProvider = ({children}) => {
  const [state, dispatch] = useReducer(feedback_reducer, initState);
  const {currentUser} = useUserContext();

  // get feedbacks
  const fetchFeedback = async () => {
    dispatch({type: actions.FETCH_BEGIN});
    try {
      const collectionRef = collection(db, 'feedbacks');
      const q = query(collectionRef, orderBy('created_at', 'desc'));
      const feedbacksSnap = await getDocs(q);
      const feedbacks = feedbacksSnap.docs.map(doc => {
        return {...doc.data(), id: doc.id};
      });
      dispatch({type: actions.FETCH_SUCCESS, payload: feedbacks});
    }
    catch(err) {
      console.log(err);
    }
  }

  // update filter
  const updateFilter = category => {
    dispatch({type: actions.UPDATE_FITLER, payload: category});
  }

  // update sort
  const updateSort = status => {
    dispatch({type: actions.UPDATE_SORT, payload: status});
  }

  // add reply comment
  const addReplyComment = commentInfo => {       
    const commentId = uuidv4();
    dispatch({type: actions.ADD_REPLY_COMMENT, payload: {...commentInfo, commentId, currentUser}});
  }

  // add comment
  const addComment = commentInfo => {
    const commentId = uuidv4();
    dispatch({type: actions.ADD_COMMENT, payload: {...commentInfo, commentId, currentUser}});
  }

  // add feedback
  const addFeedback = async feedbackData => {
    const {title, category, detail} = feedbackData;
    const collectionRef = collection(db, 'feedbacks');
    const currentFeedback = {
      user_ref: currentUser.id,
      title: title.value,
      category: category.value,
      upvotes: 0,
      status: 'suggestion',
      description: detail.value,
      comment_count: 0,
      created_at: serverTimestamp() 
    };
    const {id: createdFeedbackId} = await addDoc(collectionRef, currentFeedback);
    dispatch({type: actions.ADD_FEEDBACK, payload: {...currentFeedback, id: createdFeedbackId}});
  }

  // delete feedback
  const deleteFeedback = async id => {
    const docRef = doc(db, 'feedbacks', id);
    await deleteDoc(docRef);
    dispatch({type: actions.DELETE_FEEDBACK, payload: id});
  }

  // edit feedback
  const editFeedback = async (id, feedbackData) => {
    const {title, category, detail, status} = feedbackData;

    const docRef = doc(db, 'feedbacks', id);
    const currentFeedback = {
      title: title.value,
      category: category.value,
      description: detail.value,
      status: status.value
    };
    await updateDoc(docRef, currentFeedback);
    dispatch({type: actions.EDIT_FEEDBACK, payload: {id, currentFeedback}});
  }

  // toggle feedback vote
  const toggleFeedbackVote = (id, toggleAmount) => {
    dispatch({type: actions.TOGGLE_FEEDBACK_VOTE, payload: {id, toggleAmount}});
  }

  useEffect(() => {
    fetchFeedback();
  }, []);

  useEffect(() => {
    dispatch({type: actions.UPDATE_STATUSES});
    dispatch({type: actions.FILTER_FEEDBACKS});
    dispatch({type: actions.SORT_FEEDBACKS});
    
  }, [state.feedbacks, state.currentCategory, state.currentSort]);

  return (
    <FeedbackContext.Provider value={{
      ...state,
      updateFilter,
      updateSort,
      addReplyComment,
      addComment,
      addFeedback,
      deleteFeedback,
      editFeedback,
      toggleFeedbackVote
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}

const useFeedbackContext = () => {
  return useContext(FeedbackContext);
}

export { FeedbackProvider, useFeedbackContext };