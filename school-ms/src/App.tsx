import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import StudentsList from './components/admin/StudentsList';
import TeachersList from './components/admin/TeachersList';
import ClassesSchedules from './components/admin/ClassesSchedules';
import AttendanceMarking from './components/admin/AttendanceMarking';
import GradeBook from './components/admin/GradeBook';
import FeeManagement from './components/admin/FeeManagement';
import LibraryManagement from './components/admin/LibraryManagement';
import PortalDashboard from './pages/portal/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentsList />} />
          <Route path="/admin/teachers" element={<TeachersList />} />
          <Route path="/admin/classes" element={<ClassesSchedules />} />
          <Route path="/admin/attendance" element={<AttendanceMarking />} />
          <Route path="/admin/grades" element={<GradeBook />} />
          <Route path="/admin/fees" element={<FeeManagement />} />
          <Route path="/admin/library" element={<LibraryManagement />} />
          <Route path="/portal" element={<PortalDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
