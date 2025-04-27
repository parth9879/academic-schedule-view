
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export type Course = {
  id: string;
  name: string;
};

type CourseCardProps = {
  course: Course;
  onClick: (courseId: string) => void;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <Card className="course-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{course.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => onClick(course.id)} 
          variant="secondary" 
          className="w-full"
        >
          View Timetable
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
