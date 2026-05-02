import { useState } from 'react';
import { useStore } from '../../store/useStore';

const AttendanceMarking = () => {
  const { classes, students, attendance, addAttendance } = useStore();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const classStudents = students.filter(s => s.id === selectedClassId);

  const handleMark = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    addAttendance({
      id: crypto.randomUUID(),
      studentId,
      classId: selectedClassId,
      date,
      status,
    });
  };

  const getStatus = (studentId: string) => {
    const record = attendance.find(a => a.studentId === studentId && a.date === date && a.classId === selectedClassId);
    return record?.status;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Mark Attendance</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Student Name</th>
              <th className="p-4 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {classStudents.map(student => {
              const status = getStatus(student.id);
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{student.name}</td>
                  <td className="p-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleMark(student.id, 'Present')}
                      className={`px-3 py-1 rounded text-xs font-medium ${status === 'Present' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleMark(student.id, 'Absent')}
                      className={`px-3 py-1 rounded text-xs font-medium ${status === 'Absent' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleMark(student.id, 'Late')}
                      className={`px-3 py-1 rounded text-xs font-medium ${status === 'Late' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
                    >
                      Late
                    </button>
                  </td>
                </tr>
              )
            })}
            {classStudents.length === 0 && (
              <tr><td colSpan={2} className="p-4 text-center text-gray-500">No students found for this class.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceMarking;
