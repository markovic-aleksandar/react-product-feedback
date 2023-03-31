import * as actions from '../actions/feedback_action';
import { getFeedbacksByStatus } from '../utils';

const feedback_reducer = (state, action) => {
  if (action.type === actions.FETCH_BEGIN) {
    return {...state, feedbacksLoading: true};
  }

  if (action.type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      feedbacksLoading: false,
      feedbacks: action.payload
    }
  }

  if (action.type === actions.FETCH_ERROR) {
    return {
      ...state,
      feedbacksLoading: false,
      feedbacksError: true
    }
  }

  if (action.type === actions.UPDATE_STATUSES) {
    let {statuses, feedbacks} = state;
    const availableStatuses = feedbacks.reduce((total, item) => {
      let {status} = item;
      if (status !== 'suggestion') {
        total = {...total, [status]: total[status] + 1};
      } 
      return total;
    }, {planned: 0, ['in-progress']: 0, live: 0});

    statuses = statuses.map(status => {
      const {name} = status;
      return {...status, value: availableStatuses[name]}
    });

    return {...state, statuses};
  }

  if (action.type === actions.UPDATE_FITLER) {
    return {...state, currentCategory: action.payload};
  }

  if (action.type === actions.UPDATE_SORT) {
    return {...state, currentSort: action.payload};
  }

  if (action.type === actions.FILTER_FEEDBACKS) {
    const {feedbacks, currentCategory} = state;
    let suggestedFeedbacks = getFeedbacksByStatus(feedbacks, 'suggestion');
    
    if (currentCategory !== 'all') {
      suggestedFeedbacks = suggestedFeedbacks.filter(feedback => feedback.category === currentCategory);
    }

    return {...state, suggestedFeedbacks};
  }

  if (action.type === actions.SORT_FEEDBACKS) {
    const {suggestedFeedbacks, currentSort} = state;
    let sortedFeedbacks = [...suggestedFeedbacks];
    switch (currentSort) {
      case 'Most Upvotes':
        sortedFeedbacks = sortedFeedbacks.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'Least Upvotes':
        sortedFeedbacks = sortedFeedbacks.sort((a, b) => a.upvotes - b.upvotes);
        break;
      case 'Most Comments':
        sortedFeedbacks = sortedFeedbacks.sort((a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0));
        break;
      case 'Least Comments':
        sortedFeedbacks = sortedFeedbacks.sort((a, b) => (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0));
        break;
      default:
        break;
    }

    return {...state, suggestedFeedbacks: sortedFeedbacks};
  }

  throw new Error('Unknown action');
}

export default feedback_reducer;