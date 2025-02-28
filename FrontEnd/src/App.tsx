import StudentsPage from './pages/StudentsPage'
import NavigationBar from './components/NavigationBar';
import ProgramsPage from './pages/ProgramsPage';
import FacultiesPage from './pages/FacultiesPage';
import StatusPage from './pages/StatusPage';
import { Routes, Route } from "react-router-dom";
import Admin from './pages/Admin';

export default function App() {
  return (
    <div className='w-full h-full text-black flex flex-col items-center justify-center bg-zinc-200 rounded-lg'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/faculties" element={<FacultiesPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}