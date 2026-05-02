import { useStore } from '../../store/useStore';

const ClassesSchedules = () => {
  const { classes, timetables, subjects, teachers } = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Classes</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add Class</button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map(cls => (
            <div key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg">{cls.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Capacity: {cls.capacity} students</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Schedules (Monday)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4 font-medium">Class</th>
                <th className="p-4 font-medium">Time</th>
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Teacher</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {timetables.filter(t => t.dayOfWeek === 'Monday').slice(0, 15).map(period => {
                const cls = classes.find(c => c.id === period.classId);
                const subject = subjects.find(s => s.id === period.subjectId);
                const teacher = teachers.find(t => t.id === period.teacherId);

                return (
                  <tr key={period.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{cls?.name}</td>
                    <td className="p-4 text-gray-600">{period.startTime} - {period.endTime}</td>
                    <td className="p-4 text-gray-600">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                        {subject?.name}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{teacher?.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassesSchedules;
