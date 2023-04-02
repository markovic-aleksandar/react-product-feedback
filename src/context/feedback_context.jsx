import { useEffect, createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import feedback_reducer from '../reducers/feedback_reducer';
import * as actions from '../actions/feedback_action';

const API_URL = 'https://raw.githubusercontent.com/aebiz-aleksandar/api/main/feedbacks.json';

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

  useEffect(() => {
    fetchFeedback(API_URL);
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
      updateSort
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}

const useFeedbackContext = () => {
  return useContext(FeedbackContext);
}

export { FeedbackProvider, useFeedbackContext }