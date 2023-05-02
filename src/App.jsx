import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Home, 
  SingleFeedback, 
  Roadmap, 
  AddEditFeedback, 
  Auth, 
  Profile,
  ProtectedRoute
} from './pages';
import { ToastContainer } from 'react-toastify';

// import toastify css
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="single/:id" element={<SingleFeedback />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="add-edit/:id?" element={
            <ProtectedRoute isAuth={false}>
              <AddEditFeedback />
            </ProtectedRoute>} 
          />
          <Route path="auth" element={
            <ProtectedRoute isAuth={true}>
              <Auth />
            </ProtectedRoute>} 
          />
          <Route path="profile" element={
            <ProtectedRoute isAuth={false}>
              <Profile />          
            </ProtectedRoute>} 
          />
        </Route>
      </Routes>
      <ToastContainer 
        position="bottom-center" 
        theme="dark" 
      />
    </BrowserRouter>
  )
}

export default App;