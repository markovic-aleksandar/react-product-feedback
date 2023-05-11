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
    return {...state, votedFeedbacks: action.payload};
  }

  throw new Error('Unknown action');
}

export default user_reducer;