
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard, { Course } from '@/components/course/CourseCard';
import TimetableView, { TimetableEntry } from '@/components/timetable/TimetableView';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Mock data
const MOCK_COURSES: Course[] = [
  { id: '1', name: 'Computer Science BSc' },
  { id: '2', name: 'Data Science MSc' },
  { id: '3', name: 'Cybersecurity MSc' },
  { id: '4', name: 'Software Engineering BSc' }
];

// Mock timetable entries
const MOCK_TIMETABLE_ENTRIES: TimetableEntry[] = [
  {
    id: '1',
    subjectId: '1',
    roomId: '101',
    day: 'Monday',
    timeStart: '09:00',
    timeEnd: '11:00',
    subject: { id: '1', name: 'Introduction to Programming', courseId: '1' },
    room: { id: '101', name: 'Lab A', capacity: 30 }
  },
  {
    id: '2',
    subjectId: '2',
    roomId: '102',
    day: 'Tuesday',
    timeStart: '13:00',
    timeEnd: '15:00',
    subject: { id: '2', name: 'Database Systems', courseId: '1' },
    room: { id: '102', name: 'Room 102', capacity: 40 }
  },
  {
    id: '3',
    subjectId: '3',
    roomId: '103',
    day: 'Wednesday',
    timeStart: '10:00',
    timeEnd: '12:00',
    subject: { id: '3', name: 'Machine Learning', courseId: '2' },
    room: { id: '103', name: 'Room 103', capacity: 25 }
  },
  {
    id: '4',
    subjectId: '4',
    roomId: '104',
    day: 'Thursday',
    timeStart: '14:00',
    timeEnd: '16:00',
    subject: { id: '4', name: 'Network Security', courseId: '3' },
    room: { id: '104', name: 'Lab B', capacity: 20 }
  },
  {
    id: '5',
    subjectId: '5',
    roomId: '105',
    day: 'Friday',
    timeStart: '09:00',
    timeEnd: '11:00',
    subject: { id: '5', name: 'Software Engineering', courseId: '4' },
    room: { id: '105', name: 'Room 105', capacity: 35 }
  }
];

const DashboardPage = () => {
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
  };
  
  const filteredTimetable = selectedCourseId
    ? MOCK_TIMETABLE_ENTRIES.filter(entry => 
        entry.subject.courseId === selectedCourseId
      )
    : [];
    
  const selectedCourse = selectedCourseId
    ? MOCK_COURSES.find(course => course.id === selectedCourseId)
    : null;

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      
      {selectedCourseId ? (
        <div className="mb-6">
          <button 
            className="mb-4 flex items-center text-primary"
            onClick={() => setSelectedCourseId(null)}
          >
            ← Back to courses
          </button>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedCourse?.name} Timetable
          </h2>
          <TimetableView entries={filteredTimetable} />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Course</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_COURSES.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onClick={handleCourseClick} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
