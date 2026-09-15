import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Landing } from './pages/Landing';
import { LessonDetail } from './pages/LessonDetail';
import { Search } from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="lessons/:lessonId" element={<LessonDetail />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
