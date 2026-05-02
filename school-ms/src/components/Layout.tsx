import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, Calendar, CheckSquare, FileText, CreditCard, Library } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            School MS
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {isAdmin ? (
            <>
              <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <Home className="w-5 h-5" /> Dashboard
              </Link>
              <Link to="/admin/students" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <Users className="w-5 h-5" /> Students
              </Link>
              <Link to="/admin/teachers" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <Users className="w-5 h-5" /> Teachers
              </Link>
              <Link to="/admin/classes" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <Calendar className="w-5 h-5" /> Classes & Schedules
              </Link>
              <Link to="/admin/attendance" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <CheckSquare className="w-5 h-5" /> Attendance
              </Link>
              <Link to="/admin/grades" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <FileText className="w-5 h-5" /> Grade Book
              </Link>
              <Link to="/admin/fees" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <CreditCard className="w-5 h-5" /> Fees
              </Link>
              <Link to="/admin/library" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <Library className="w-5 h-5" /> Library
              </Link>
            </>
          ) : (
            <>
              <Link to="/portal" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600">
                <Home className="w-5 h-5" /> Dashboard
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {isAdmin ? 'Admin Portal' : 'Student/Parent Portal'}
          </h2>
          <div className="flex items-center gap-4">
             <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Switch Role</Link>
             <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
               U
             </div>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
