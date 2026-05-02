import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import type {
  Student,
  Teacher,
  Class,
  Subject,
  TimetablePeriod,
  Grade,
  Attendance,
  FeeInvoice,
  LibraryBook,
} from '../types';

export const generateMockData = () => {
  const classes: Class[] = Array.from({ length: 10 }).map((_, i) => ({
    id: uuidv4(),
    name: `Grade ${i + 1}`,
    capacity: 50,
  }));

  const subjects: Subject[] = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art'
  ].map(name => ({
    id: uuidv4(),
    name,
  }));

  const teachers: Teacher[] = Array.from({ length: 30 }).map(() => ({
    id: uuidv4(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subjectIds: faker.helpers.arrayElements(subjects.map(s => s.id), { min: 1, max: 3 }),
  }));

  const students: Student[] = Array.from({ length: 500 }).map(() => ({
    id: uuidv4(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    classId: faker.helpers.arrayElement(classes).id,
    enrollmentDate: faker.date.past({ years: 2 }).toISOString(),
  }));

  const timetables: TimetablePeriod[] = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  classes.forEach(cls => {
    days.forEach(day => {
      let startTime = 8;
      for (let i = 0; i < 6; i++) {
        timetables.push({
          id: uuidv4(),
          classId: cls.id,
          subjectId: faker.helpers.arrayElement(subjects).id,
          teacherId: faker.helpers.arrayElement(teachers).id,
          dayOfWeek: day,
          startTime: `${startTime + i}:00`,
          endTime: `${startTime + i + 1}:00`,
        });
      }
    });
  });

  const grades: Grade[] = [];
  students.forEach(student => {
    subjects.slice(0, 5).forEach(subject => {
      grades.push({
        id: uuidv4(),
        studentId: student.id,
        subjectId: subject.id,
        examName: 'Midterm Exam',
        score: faker.number.int({ min: 40, max: 100 }),
        maxScore: 100,
        date: faker.date.recent({ days: 30 }).toISOString(),
      });
    });
  });

  const attendance: Attendance[] = [];
  students.forEach(student => {
    for (let i = 0; i < 5; i++) {
      attendance.push({
        id: uuidv4(),
        studentId: student.id,
        classId: student.classId,
        date: faker.date.recent({ days: 10 }).toISOString().split('T')[0],
        status: faker.helpers.arrayElement(['Present', 'Present', 'Present', 'Absent', 'Late']),
      });
    }
  });

  const fees: FeeInvoice[] = students.map(student => ({
    id: uuidv4(),
    studentId: student.id,
    amount: 1000,
    dueDate: faker.date.future({ years: 0.1 }).toISOString(),
    status: faker.helpers.arrayElement(['Paid', 'Unpaid', 'Partial']),
    paidAmount: faker.number.int({ min: 0, max: 1000 }),
  }));

  const library: LibraryBook[] = Array.from({ length: 50 }).map(() => ({
    id: uuidv4(),
    title: faker.commerce.productName() + ' Book',
    author: faker.person.fullName(),
    isbn: faker.string.numeric(13),
    totalCopies: faker.number.int({ min: 1, max: 10 }),
    availableCopies: faker.number.int({ min: 0, max: 10 }),
  }));

  return { classes, subjects, teachers, students, timetables, grades, attendance, fees, library };
};
