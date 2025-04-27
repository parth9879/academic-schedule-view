
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Course } from '@/components/course/CourseCard';
import type { TimetableEntry } from '@/components/timetable/TimetableView';

type Subject = {
  id: string;
  name: string;
  courseId: string;
};

type Room = {
  id: string;
  name: string;
  capacity: number;
};

// Mock data
const MOCK_COURSES: Course[] = [
  { id: '1', name: 'Computer Science BSc' },
  { id: '2', name: 'Data Science MSc' },
  { id: '3', name: 'Cybersecurity MSc' },
  { id: '4', name: 'Software Engineering BSc' }
];

const MOCK_SUBJECTS: Subject[] = [
  { id: '1', name: 'Introduction to Programming', courseId: '1' },
  { id: '2', name: 'Database Systems', courseId: '1' },
  { id: '3', name: 'Machine Learning', courseId: '2' },
  { id: '4', name: 'Network Security', courseId: '3' },
  { id: '5', name: 'Software Engineering', courseId: '4' },
];

const MOCK_ROOMS: Room[] = [
  { id: '101', name: 'Lab A', capacity: 30 },
  { id: '102', name: 'Room 102', capacity: 40 },
  { id: '103', name: 'Room 103', capacity: 25 },
  { id: '104', name: 'Lab B', capacity: 20 },
  { id: '105', name: 'Room 105', capacity: 35 },
];

const initialTimetables: TimetableEntry[] = [
  {
    id: '1',
    subjectId: '1',
    roomId: '101',
    day: 'Monday',
    timeStart: '09:00',
    timeEnd: '11:00',
    subject: MOCK_SUBJECTS[0],
    room: MOCK_ROOMS[0]
  },
  {
    id: '2',
    subjectId: '2',
    roomId: '102',
    day: 'Tuesday',
    timeStart: '13:00',
    timeEnd: '15:00',
    subject: MOCK_SUBJECTS[1],
    room: MOCK_ROOMS[1]
  },
  {
    id: '3',
    subjectId: '3',
    roomId: '103',
    day: 'Wednesday',
    timeStart: '10:00',
    timeEnd: '12:00',
    subject: MOCK_SUBJECTS[2],
    room: MOCK_ROOMS[2]
  },
  {
    id: '4',
    subjectId: '4',
    roomId: '104',
    day: 'Thursday',
    timeStart: '14:00',
    timeEnd: '16:00',
    subject: MOCK_SUBJECTS[3],
    room: MOCK_ROOMS[3]
  },
  {
    id: '5',
    subjectId: '5',
    roomId: '105',
    day: 'Friday',
    timeStart: '09:00',
    timeEnd: '11:00',
    subject: MOCK_SUBJECTS[4],
    room: MOCK_ROOMS[4]
  }
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
] as const;

const TimetableManager = () => {
  const [timetables, setTimetables] = useState<TimetableEntry[]>(initialTimetables);
  const [isAddingTimetable, setIsAddingTimetable] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState<TimetableEntry | null>(null);
  
  const [subjectId, setSubjectId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [day, setDay] = useState<typeof days[number] | ''>('');
  const [timeStart, setTimeStart] = useState<typeof timeSlots[number] | ''>('');
  const [timeEnd, setTimeEnd] = useState<typeof timeSlots[number] | ''>('');
  
  const { toast } = useToast();
  
  const handleAddTimetable = () => {
    if (!subjectId || !roomId || !day || !timeStart || !timeEnd) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (timeStart >= timeEnd) {
      toast({
        title: "Error",
        description: "End time must be after start time",
        variant: "destructive"
      });
      return;
    }
    
    const subject = MOCK_SUBJECTS.find(s => s.id === subjectId);
    const room = MOCK_ROOMS.find(r => r.id === roomId);
    
    if (!subject || !room) {
      toast({
        title: "Error",
        description: "Invalid subject or room selected",
        variant: "destructive"
      });
      return;
    }
    
    const newTimetable: TimetableEntry = {
      id: Date.now().toString(),
      subjectId,
      roomId,
      day: day as typeof days[number],
      timeStart,
      timeEnd,
      subject,
      room
    };
    
    setTimetables([...timetables, newTimetable]);
    resetForm();
    
    toast({
      title: "Success",
      description: "Timetable entry added successfully",
    });
  };
  
  const handleEditTimetable = () => {
    if (!editingTimetable || !subjectId || !roomId || !day || !timeStart || !timeEnd) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (timeStart >= timeEnd) {
      toast({
        title: "Error",
        description: "End time must be after start time",
        variant: "destructive"
      });
      return;
    }
    
    const subject = MOCK_SUBJECTS.find(s => s.id === subjectId);
    const room = MOCK_ROOMS.find(r => r.id === roomId);
    
    if (!subject || !room) {
      toast({
        title: "Error",
        description: "Invalid subject or room selected",
        variant: "destructive"
      });
      return;
    }
    
    const updatedTimetable: TimetableEntry = {
      ...editingTimetable,
      subjectId,
      roomId,
      day: day as typeof days[number],
      timeStart,
      timeEnd,
      subject,
      room
    };
    
    setTimetables(timetables.map(timetable => 
      timetable.id === editingTimetable.id ? updatedTimetable : timetable
    ));
    
    resetForm();
    
    toast({
      title: "Success",
      description: "Timetable entry updated successfully",
    });
  };
  
  const handleStartEditing = (timetable: TimetableEntry) => {
    setEditingTimetable(timetable);
    setSubjectId(timetable.subjectId);
    setRoomId(timetable.roomId);
    setDay(timetable.day);
    setTimeStart(timetable.timeStart);
    setTimeEnd(timetable.timeEnd);
    setIsAddingTimetable(false);
  };
  
  const handleDeleteTimetable = (id: string) => {
    setTimetables(timetables.filter(timetable => timetable.id !== id));
    
    toast({
      title: "Success",
      description: "Timetable entry deleted successfully",
    });
  };

  const resetForm = () => {
    setIsAddingTimetable(false);
    setEditingTimetable(null);
    setSubjectId('');
    setRoomId('');
    setDay('');
    setTimeStart('');
    setTimeEnd('');
  };

  const getSubjectsBySelectedCourse = (courseId: string) => {
    return MOCK_SUBJECTS.filter(subject => subject.courseId === courseId);
  };

  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');
  
  // Filter timetables based on selected course
  const filteredTimetables = selectedCourseFilter
    ? timetables.filter(entry => 
        MOCK_SUBJECTS.some(
          subject => subject.id === entry.subjectId && subject.courseId === selectedCourseFilter
        )
      )
    : timetables;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Timetables</h2>
        
        {!isAddingTimetable && !editingTimetable && (
          <Button onClick={() => setIsAddingTimetable(true)}>
            <Plus size={16} className="mr-2" />
            Add Timetable Entry
          </Button>
        )}
      </div>
      
      {(isAddingTimetable || editingTimetable) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingTimetable ? 'Edit Timetable Entry' : 'Add New Timetable Entry'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select 
                    onValueChange={(value) => {
                      // Reset subject when course changes
                      setSubjectId('');
                    }}
                  >
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_COURSES.map(course => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={subjectId}
                    onValueChange={setSubjectId}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_SUBJECTS.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Select 
                    value={roomId}
                    onValueChange={setRoomId}
                  >
                    <SelectTrigger id="room">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_ROOMS.map(room => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name} (Capacity: {room.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="day">Day</Label>
                  <Select 
                    value={day}
                    onValueChange={(value) => setDay(value as typeof days[number])}
                  >
                    <SelectTrigger id="day">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map(d => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeStart">Start Time</Label>
                  <Select 
                    value={timeStart}
                    onValueChange={(value) => setTimeStart(value as typeof timeSlots[number])}
                  >
                    <SelectTrigger id="timeStart">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={`start-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeEnd">End Time</Label>
                  <Select 
                    value={timeEnd}
                    onValueChange={(value) => setTimeEnd(value as typeof timeSlots[number])}
                  >
                    <SelectTrigger id="timeEnd">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={`end-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button onClick={editingTimetable ? handleEditTimetable : handleAddTimetable}>
                  {editingTimetable ? 'Update' : 'Add'} Timetable Entry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mb-4">
        <Label htmlFor="courseFilter">Filter by Course</Label>
        <div className="flex gap-4 mt-2">
          <Select 
            value={selectedCourseFilter}
            onValueChange={setSelectedCourseFilter}
          >
            <SelectTrigger id="courseFilter" className="w-64">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Courses</SelectItem>
              {MOCK_COURSES.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTimetables.map((timetable) => (
            <TableRow key={timetable.id}>
              <TableCell>{timetable.subject.name}</TableCell>
              <TableCell>{timetable.room.name}</TableCell>
              <TableCell>{timetable.day}</TableCell>
              <TableCell>{timetable.timeStart} - {timetable.timeEnd}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleStartEditing(timetable)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteTimetable(timetable.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TimetableManager;
