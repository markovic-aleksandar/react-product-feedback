export const getFeedbacksByStatus = (feedbacks, status) => {
  return feedbacks.filter(feedback => feedback.status === status);
}

export const getUserImages = paths => {
  const images = {};
  const targetTxt = 'user-images/';
  for (let i in paths) {
    images[i.split("/").slice(-1).join().split(".").shift()] = i;
    // images[i.slice(i.indexOf(targetTxt) + targetTxt.length).slice(0, )] = i;
  }
  return images;
}