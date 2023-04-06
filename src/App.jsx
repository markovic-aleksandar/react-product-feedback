import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, SingleFeedback, Roadmap, AddEditFeedback } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="single/:id" element={<SingleFeedback />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="add-edit/:id?" element={<AddEditFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;