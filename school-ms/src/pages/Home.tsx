import { Link } from 'react-router-dom';
import { ShieldCheck, User } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">School Management System</h1>
        <p className="text-xl text-gray-600">Please select your role to continue</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/admin"
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 w-64"
        >
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Admin</h2>
          <p className="text-gray-500 mt-2 text-center">Manage students, teachers, classes, and more</p>
        </Link>

        <Link
          to="/portal"
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 w-64"
        >
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Student/Parent</h2>
          <p className="text-gray-500 mt-2 text-center">View attendance, grades, and report cards</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
