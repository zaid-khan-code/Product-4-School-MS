import { useState } from 'react';
import { useStore } from '../../store/useStore';

const GradeBook = () => {
  const { classes, subjects, students, grades } = useStore();
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');

  const classStudents = students.filter(s => s.id === selectedClassId);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Grade Book</h2>
        <div className="flex gap-4">
          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={selectedSubjectId}
            onChange={e => setSelectedSubjectId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Student Name</th>
              <th className="p-4 font-medium">Midterm</th>
              <th className="p-4 font-medium">Finals</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {classStudents.map(student => {
              const studentGrades = grades.filter(g => g.studentId === student.id && g.subjectId === selectedSubjectId);
              const midterm = studentGrades.find(g => g.examName.includes('Midterm'))?.score || '-';

              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{student.name}</td>
                  <td className="p-4 text-gray-600">{midterm} / 100</td>
                  <td className="p-4 text-gray-600">
                    <button className="text-blue-600 hover:underline text-xs">Add Grade</button>
                  </td>
                </tr>
              )
            })}
            {classStudents.length === 0 && (
              <tr><td colSpan={3} className="p-4 text-center text-gray-500">No students found for this class.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeBook;
