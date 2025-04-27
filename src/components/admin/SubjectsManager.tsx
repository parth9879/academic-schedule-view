
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Course } from '@/components/course/CourseCard';

type Subject = {
  id: string;
  name: string;
  courseId: string;
};

// Mock data
const MOCK_COURSES: Course[] = [
  { id: '1', name: 'Computer Science BSc' },
  { id: '2', name: 'Data Science MSc' },
  { id: '3', name: 'Cybersecurity MSc' },
  { id: '4', name: 'Software Engineering BSc' }
];

const initialSubjects: Subject[] = [
  { id: '1', name: 'Introduction to Programming', courseId: '1' },
  { id: '2', name: 'Database Systems', courseId: '1' },
  { id: '3', name: 'Machine Learning', courseId: '2' },
  { id: '4', name: 'Network Security', courseId: '3' },
  { id: '5', name: 'Software Engineering', courseId: '4' },
];

const SubjectsManager = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  
  const [subjectName, setSubjectName] = useState('');
  const [courseId, setCourseId] = useState('');
  
  const { toast } = useToast();
  
  const handleAddSubject = () => {
    if (!subjectName || !courseId) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: subjectName,
      courseId
    };
    
    setSubjects([...subjects, newSubject]);
    setSubjectName('');
    setCourseId('');
    setIsAddingSubject(false);
    
    toast({
      title: "Success",
      description: "Subject added successfully",
    });
  };
  
  const handleEditSubject = () => {
    if (!editingSubject || !subjectName || !courseId) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedSubject: Subject = {
      ...editingSubject,
      name: subjectName,
      courseId
    };
    
    setSubjects(subjects.map(subject => 
      subject.id === editingSubject.id ? updatedSubject : subject
    ));
    
    setEditingSubject(null);
    setSubjectName('');
    setCourseId('');
    
    toast({
      title: "Success",
      description: "Subject updated successfully",
    });
  };
  
  const handleStartEditing = (subject: Subject) => {
    setEditingSubject(subject);
    setSubjectName(subject.name);
    setCourseId(subject.courseId);
    setIsAddingSubject(false);
  };
  
  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    
    toast({
      title: "Success",
      description: "Subject deleted successfully",
    });
  };

  const getCourseName = (courseId: string) => {
    const course = MOCK_COURSES.find(course => course.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Subjects</h2>
        
        {!isAddingSubject && !editingSubject && (
          <Button onClick={() => setIsAddingSubject(true)}>
            <Plus size={16} className="mr-2" />
            Add Subject
          </Button>
        )}
      </div>
      
      {(isAddingSubject || editingSubject) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subjectName">Subject Name</Label>
                  <Input 
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="e.g., Introduction to Programming"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select 
                    value={courseId}
                    onValueChange={setCourseId}
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
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingSubject(false);
                    setEditingSubject(null);
                    setSubjectName('');
                    setCourseId('');
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingSubject ? handleEditSubject : handleAddSubject}>
                  {editingSubject ? 'Update' : 'Add'} Subject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{getCourseName(subject.courseId)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleStartEditing(subject)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteSubject(subject.id)}
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

export default SubjectsManager;
