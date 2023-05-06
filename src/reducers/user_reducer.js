import * as actions from '../actions/user_action';

const user_reducer = (state, action) => {
  if (action.type === actions.SET_USER) {
    return {
      ...state,
      currentUserLoading: false,
      currentUser: action.payload
    }
  }

  if (action.type === actions.START_LOADING) {
    return {...state, currentUserLoading: true};
  }

  if (action.type === actions.END_LOADING) {
    return {...state, currentUserLoading: false};
  }

  if (action.type === actions.TOGGLE_VOTES) {
    const id = action.payload;
    const {votedFeedbacks} = state;

    const tempVotedFeedbacks = votedFeedbacks.includes(id) ?
    votedFeedbacks.filter(feedbackId => feedbackId !== id) : [...votedFeedbacks, id];

    return {...state, votedFeedbacks: tempVotedFeedbacks};
  }

  throw new Error('Unknown action');
}

export default user_reducer;