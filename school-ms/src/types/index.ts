export interface Student {
  id: string;
  name: string;
  email: string;
  classId: string;
  enrollmentDate: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjectIds: string[];
}

export interface Class {
  id: string;
  name: string;
  capacity: number;
}

export interface Subject {
  id: string;
  name: string;
}

export interface TimetablePeriod {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  examName: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  periodId?: string;
}

export interface FeeInvoice {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Partial';
  paidAmount: number;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
}

export interface BookIssue {
  id: string;
  bookId: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Issued' | 'Returned';
}
