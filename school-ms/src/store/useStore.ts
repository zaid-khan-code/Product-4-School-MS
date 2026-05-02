import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  BookIssue,
} from '../types';
import { generateMockData } from '../utils/mockData';

interface StoreState {
  students: Student[];
  teachers: Teacher[];
  classes: Class[];
  subjects: Subject[];
  timetables: TimetablePeriod[];
  grades: Grade[];
  attendance: Attendance[];
  fees: FeeInvoice[];
  libraryBooks: LibraryBook[];
  bookIssues: BookIssue[];

  // Actions
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;

  addTeacher: (teacher: Teacher) => void;
  addAttendance: (attendance: Attendance) => void;
  addGrade: (grade: Grade) => void;
  addFeeInvoice: (invoice: FeeInvoice) => void;
  updateFeeInvoice: (invoice: FeeInvoice) => void;

  issueBook: (issue: BookIssue) => void;
  returnBook: (issueId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      students: [],
      teachers: [],
      classes: [],
      subjects: [],
      timetables: [],
      grades: [],
      attendance: [],
      fees: [],
      libraryBooks: [],
      bookIssues: [],

      addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
      updateStudent: (updatedStudent) =>
        set((state) => ({
          students: state.students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)),
        })),
      deleteStudent: (id) =>
        set((state) => ({ students: state.students.filter((s) => s.id !== id) })),

      addTeacher: (teacher) => set((state) => ({ teachers: [...state.teachers, teacher] })),
      addAttendance: (record) => set((state) => ({ attendance: [...state.attendance, record] })),
      addGrade: (grade) => set((state) => ({ grades: [...state.grades, grade] })),
      addFeeInvoice: (invoice) => set((state) => ({ fees: [...state.fees, invoice] })),
      updateFeeInvoice: (invoice) =>
        set((state) => ({
          fees: state.fees.map((f) => (f.id === invoice.id ? invoice : f)),
        })),

      issueBook: (issue) =>
        set((state) => {
          const bookIndex = state.libraryBooks.findIndex((b) => b.id === issue.bookId);
          if (bookIndex === -1 || state.libraryBooks[bookIndex].availableCopies <= 0) return state;

          const newBooks = [...state.libraryBooks];
          newBooks[bookIndex] = {
            ...newBooks[bookIndex],
            availableCopies: newBooks[bookIndex].availableCopies - 1,
          };

          return { libraryBooks: newBooks, bookIssues: [...state.bookIssues, issue] };
        }),
      returnBook: (issueId) =>
        set((state) => {
          const issueIndex = state.bookIssues.findIndex((i) => i.id === issueId);
          if (issueIndex === -1 || state.bookIssues[issueIndex].status === 'Returned') return state;

          const issue = state.bookIssues[issueIndex];
          const bookIndex = state.libraryBooks.findIndex((b) => b.id === issue.bookId);

          const newIssues = [...state.bookIssues];
          newIssues[issueIndex] = { ...issue, status: 'Returned', returnDate: new Date().toISOString() };

          const newBooks = [...state.libraryBooks];
          if (bookIndex !== -1) {
            newBooks[bookIndex] = {
              ...newBooks[bookIndex],
              availableCopies: newBooks[bookIndex].availableCopies + 1,
            };
          }

          return { bookIssues: newIssues, libraryBooks: newBooks };
        }),
    }),
    {
      name: 'school-ms-storage',
      onRehydrateStorage: () => (state) => {
        if (state && state.students.length === 0) {
          const mockData = generateMockData();
          state.students = mockData.students;
          state.teachers = mockData.teachers;
          state.classes = mockData.classes;
          state.subjects = mockData.subjects;
          state.timetables = mockData.timetables;
          state.grades = mockData.grades;
          state.attendance = mockData.attendance;
          state.fees = mockData.fees;
          state.libraryBooks = mockData.library;
        }
      },
    }
  )
);
