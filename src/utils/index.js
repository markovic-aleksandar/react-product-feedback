export const getFeedbacksByStatus = (feedbacks, status) => {
  return feedbacks.filter(feedback => feedback.status === status);
}

export const getUserImages = paths => {
  let allPaths = [];
  const images = {};

  for (let i in paths) {
    allPaths.push(paths[i]);
  }
  
  return Promise.all(allPaths.map(path => path()))
  .then(response => {
    response.forEach(item => {
      const path = item.default;
      images[path.split("/").slice(-1).join().split(".").shift()] = path;  
    });
    return images;
  }).catch(err => console.log(err));
}

export const validateInputData = data => {
  let errors = 0;
  let dataItems = {...data};
  for (const dataItem in dataItems) {
    if (!dataItems[dataItem].value) {
      errors ++;
      dataItems = {...dataItems, [dataItem]: {...dataItems[dataItem], error: true}};
    } else {
      dataItems = {...dataItems, [dataItem]: {...dataItems[dataItem], error: false}};
    }
  }

  return {dataItems, error: errors > 0 ? true : false};
}

export const getDataFromStorage = storageName => {
  return JSON.parse(localStorage.getItem(storageName));
}

export const handleErrorMessage = error => {
  switch (error) {
    case 'auth/missing-email':
      return 'The email field can\'t be empty!';
    case 'auth/invalid-email':
      return 'The email address is not valid!';
    case 'auth/email-already-in-use':
      return 'The user with this email address already exists';
    case 'auth/user-not-found':
      return 'The user with this email address is not exists';
    case 'auth/wrong-password':
      return 'The password is incorrect';
    default:
      return error;
  }
}