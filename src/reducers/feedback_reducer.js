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
      const status = item.status.toLowerCase();
      if (status !== 'suggestion') {
        total = {...total, [status]: [...total[status], item]};
      } 
      return total;
    }, {planned: [], ['in-progress']: [], live: []});

    statuses = statuses.map(status => {
      const {name} = status;
      return {...status, items: availableStatuses[name]}
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
      suggestedFeedbacks = suggestedFeedbacks.filter(feedback => feedback.category.toLowerCase() === currentCategory);
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

  if (action.type === actions.ADD_REPLY_COMMENT) {
    const {
      feedbackId,
      parentId,
      content,
      replyingTo,
      commentId,
      currentUser
    } = action.payload;

    const commentObj = {
      id: commentId,
      parentId,
      content,
      replyingTo,
      user: currentUser
    };
    
    const tempFeedbacks = state.feedbacks.map(feedback => {
      if (feedback.id === feedbackId) {
        const comments = feedback.comments.map(comment => {
          if (comment.id === parentId) {
            const replies = comment.replies ? [...comment.replies, commentObj] : [commentObj];
            return {...comment, replies};
          }
          return comment;
        });
        return {...feedback, comments};
      }
      return feedback;
    });

    return {...state, feedbacks: tempFeedbacks};
  }

  if (action.type === actions.ADD_COMMENT) {
    const {
      feedbackId,
      content,
      commentId,
      currentUser
    } = action.payload;

    const commentObj = {
      id: commentId,
      content,
      user: currentUser
    };

    const tempFeedbacks = state.feedbacks.map(feedback => {
      if (feedback.id === feedbackId) {
        const comments = feedback.comments ? [...feedback.comments, commentObj] : [commentObj];
        return {...feedback, comments};
      }
      return feedback;
    });

    return {...state, feedbacks: tempFeedbacks};
  }

  if (action.type === actions.ADD_FEEDBACK) {
    const feedbackObj = {
      ...action.payload,
      upvotes: 0,
      status: 'suggestion'
    };

    return {...state, feedbacks: [...state.feedbacks, feedbackObj]};
  }

  if (action.type === actions.DELETE_FEEDBACK) {
    const tempFeedbacks = state.feedbacks.filter(feedback => feedback.id !== action.payload);

    return {...state, feedbacks: tempFeedbacks};
  }

  if (action.type === actions.EDIT_FEEDBACK) {
    const {id, feedbackInfo: feedbackObj} = action.payload;

    const tempFeedbacks = state.feedbacks.map(feedback => {
      if (feedback.id === id) {
        return {...feedback, ...feedbackObj};
      }
      return feedback;
    });

    return {...state, feedbacks: tempFeedbacks};
  }

  throw new Error('Unknown action');
}

export default feedback_reducer;