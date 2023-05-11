import { useEffect } from 'react';
import { 
  GradientBoard, 
  CategoryBoard,
  RoadmapBoard,
  SuggestionsBoard,
  Feedbacks
} from '../components';

const Home = () => {

  // reset scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <aside className="app-container-side">
        <GradientBoard />
        <CategoryBoard />
        <RoadmapBoard />
      </aside>
      <main className="app-container-main">
        <SuggestionsBoard />
        <Feedbacks />
      </main>
    </>
  )
}

export default Home;