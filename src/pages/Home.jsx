import { 
  GradientBoard, 
  CategoryBoard,
  RoadmapBoard,
  SuggestionsBoard,
  Feedbacks
} from '../components';

const Home = () => {
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