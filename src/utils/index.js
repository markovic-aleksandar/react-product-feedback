export const getFeedbacksByStatus = (feedbacks, status) => {
  return feedbacks.filter(feedback => feedback.status === status);
}