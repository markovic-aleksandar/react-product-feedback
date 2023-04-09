import { useEffect, createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from './user_context';
import feedback_reducer from '../reducers/feedback_reducer';
import * as actions from '../actions/feedback_action';
import { getDataFromStorage } from '../utils';

const API_URL = 'https://raw.githubusercontent.com/aebiz-aleksandar/api/main/feedbacks.json';

const FeedbackContext = createContext();

const initState = {
  feedbacksLoading: true,
  feedbacksError: false,
  feedbacks: getDataFromStorage('feedbacks') ?? [],
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

  // get feedbacks from api
  const fetchFeedback = async url => {
    dispatch({type: actions.FETCH_BEGIN});
    try {
      const response = await axios(url);
      const {data} = response;
      
      dispatch({type: actions.FETCH_SUCCESS, payload: data});
    }
    catch(err) {
      dispatch({type: actions.FETCH_ERROR});
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
  const addFeedback = feedbackInfo => {
    const feedbackId = uuidv4();
    dispatch({type: actions.ADD_FEEDBACK, payload: {...feedbackInfo, id: feedbackId}});
  }

  // delete feedback
  const deleteFeedback = id => {
    dispatch({type: actions.DELETE_FEEDBACK, payload: id});
  }

  // edit feedback
  const editFeedback = (id, feedbackInfo) => {
    dispatch({type: actions.EDIT_FEEDBACK, payload: {id, feedbackInfo}});
  }

  // toggle feedback vote
  const toggleFeedbackVote = (id, toggleAmount) => {
    dispatch({type: actions.TOGGLE_FEEDBACK_VOTE, payload: {id, toggleAmount}});
  }

  useEffect(() => {
    if (!getDataFromStorage('feedbacks')) {
      fetchFeedback(API_URL);
    } else {        
      dispatch({type: actions.FETCH_SUCCESS, payload: getDataFromStorage('feedbacks')})
    }
  }, []);

  useEffect(() => {
    dispatch({type: actions.UPDATE_STATUSES});
    dispatch({type: actions.FILTER_FEEDBACKS});
    dispatch({type: actions.SORT_FEEDBACKS});
    
    localStorage.setItem('feedbacks', JSON.stringify(state.feedbacks));
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