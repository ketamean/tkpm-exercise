import StudentsPage from './pages/StudentsPage'
import NavigationBar from './components/NavigationBar';
import ProgramsPage from './pages/ProgramsPage';
import FacultiesPage from './pages/FacultiesPage';
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className='w-full h-full text-black flex flex-col items-center justify-center bg-zinc-200 rounded-lg'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/faculties" element={<FacultiesPage />} />
      </Routes>
    </div>
  )
}