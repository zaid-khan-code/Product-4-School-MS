import { useStore } from '../../store/useStore';

const PortalDashboard = () => {
  const { students, attendance, grades, subjects } = useStore();

  // For demo, just pick the first student
  const student = students[0];

  if (!student) return <div>Loading...</div>;

  const studentAttendance = attendance.filter(a => a.studentId === student.id);
  const presentDays = studentAttendance.filter(a => a.status === 'Present').length;
  const attendancePercentage = studentAttendance.length > 0
    ? Math.round((presentDays / studentAttendance.length) * 100)
    : 0;

  const studentGrades = grades.filter(g => g.studentId === student.id);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome, {student.name}</h2>
        <p className="text-gray-600">Here is your academic overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Overview</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Overall Attendance</span>
            <span className={`text-lg font-bold ${attendancePercentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
              {attendancePercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${attendancePercentage}%` }}></div>
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Grades</h3>
          <div className="space-y-4">
            {studentGrades.slice(0, 5).map(grade => {
              const subject = subjects.find(s => s.id === grade.subjectId);
              const percentage = Math.round((grade.score / grade.maxScore) * 100);
              return (
                <div key={grade.id} className="flex items-center justify-between">
                  <span className="text-gray-700">{subject?.name || 'Unknown'} - {grade.examName}</span>
                  <span className={`font-medium ${percentage >= 40 ? 'text-green-600' : 'text-red-600'}`}>
                    {grade.score}/{grade.maxScore}
                  </span>
                </div>
              );
            })}
            {studentGrades.length === 0 && <p className="text-gray-500">No grades recorded yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalDashboard;
