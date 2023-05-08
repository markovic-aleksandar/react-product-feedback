import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/user_context';
import { FeedbackProvider } from './context/feedback_context';
import { CommentProvider } from './context/comment_context';

// import style
import './scss/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <FeedbackProvider>
        <CommentProvider>
          <App />
        </CommentProvider>
      </FeedbackProvider>
    </UserProvider>
  </React.StrictMode>
);
