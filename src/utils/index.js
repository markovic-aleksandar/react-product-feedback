export const getFeedbacksByStatus = (feedbacks, status) => {
  return feedbacks.filter(feedback => feedback.status === status);
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

export const showSelectedAvatar = (el, image, generateImage) => {
  const acceptType = ['image/png', 'image/jpeg', 'image/jpg'];

  if (el.files && el.files[0] && acceptType.includes(el.files[0].type)) {
    const reader = new FileReader();

    reader.onload = e => {
      image.src = e.target.result;
    }
    reader.readAsDataURL(el.files[0]);
  } else {
    image.src = generateImage;
  }
}