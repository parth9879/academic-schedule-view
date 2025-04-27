
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Course } from '@/components/course/CourseCard';

// Mock data
const initialCourses: Course[] = [
  { id: '1', name: 'Computer Science BSc' },
  { id: '2', name: 'Data Science MSc' },
  { id: '3', name: 'Cybersecurity MSc' },
  { id: '4', name: 'Software Engineering BSc' }
];

const CoursesManager = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const [courseName, setCourseName] = useState('');
  
  const { toast } = useToast();
  
  const handleAddCourse = () => {
    if (!courseName) {
      toast({
        title: "Error",
        description: "Please enter a course name",
        variant: "destructive"
      });
      return;
    }
    
    const newCourse: Course = {
      id: Date.now().toString(),
      name: courseName,
    };
    
    setCourses([...courses, newCourse]);
    setCourseName('');
    setIsAddingCourse(false);
    
    toast({
      title: "Success",
      description: "Course added successfully",
    });
  };
  
  const handleEditCourse = () => {
    if (!editingCourse || !courseName) {
      toast({
        title: "Error",
        description: "Please enter a course name",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCourse: Course = {
      ...editingCourse,
      name: courseName,
    };
    
    setCourses(courses.map(course => 
      course.id === editingCourse.id ? updatedCourse : course
    ));
    
    setEditingCourse(null);
    setCourseName('');
    
    toast({
      title: "Success",
      description: "Course updated successfully",
    });
  };
  
  const handleStartEditing = (course: Course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setIsAddingCourse(false);
  };
  
  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    
    toast({
      title: "Success",
      description: "Course deleted successfully",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Courses</h2>
        
        {!isAddingCourse && !editingCourse && (
          <Button onClick={() => setIsAddingCourse(true)}>
            <Plus size={16} className="mr-2" />
            Add Course
          </Button>
        )}
      </div>
      
      {(isAddingCourse || editingCourse) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input 
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g., Computer Science BSc"
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingCourse(false);
                    setEditingCourse(null);
                    setCourseName('');
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingCourse ? handleEditCourse : handleAddCourse}>
                  {editingCourse ? 'Update' : 'Add'} Course
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleStartEditing(course)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteCourse(course.id)}
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

export default CoursesManager;
