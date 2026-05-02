import { useStore } from '../../store/useStore';

const TeachersList = () => {
  const { teachers, subjects } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Teachers</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Teacher</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Subjects</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {teachers.map(teacher => {
              const teacherSubjects = teacher.subjectIds
                .map(id => subjects.find(s => s.id === id)?.name)
                .filter(Boolean)
                .join(', ');

              return (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{teacher.name}</td>
                  <td className="p-4 text-gray-600">{teacher.email}</td>
                  <td className="p-4 text-gray-600">{teacherSubjects}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersList;
