import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Home, 
  SingleFeedback, 
  Roadmap, 
  AddEditFeedback, 
  Auth, 
  Profile
} from './pages';
import { Alert } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Alert type="error" message="Successful added" />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="single/:id" element={<SingleFeedback />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="add-edit/:id?" element={<AddEditFeedback />} />
          <Route path="auth" element={<Auth />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;