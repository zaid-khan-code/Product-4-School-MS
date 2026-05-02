import { useStore } from '../../store/useStore';

const StudentsList = () => {
  const { students, classes } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Students</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Student</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Class</th>
              <th className="p-4 font-medium">Enrollment Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {students.slice(0, 20).map(student => {
              const studentClass = classes.find(c => c.id === student.classId);
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{student.name}</td>
                  <td className="p-4 text-gray-600">{student.email}</td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {studentClass?.name || 'Unknown'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
