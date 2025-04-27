
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoomsManager from './RoomsManager';
import CoursesManager from './CoursesManager';
import SubjectsManager from './SubjectsManager';
import TimetableManager from './TimetableManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('timetable');

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-8">
          <TabsTrigger value="timetable" className="flex-1">Timetables</TabsTrigger>
          <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
          <TabsTrigger value="subjects" className="flex-1">Subjects</TabsTrigger>
          <TabsTrigger value="rooms" className="flex-1">Rooms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timetable">
          <TimetableManager />
        </TabsContent>
        
        <TabsContent value="courses">
          <CoursesManager />
        </TabsContent>
        
        <TabsContent value="subjects">
          <SubjectsManager />
        </TabsContent>
        
        <TabsContent value="rooms">
          <RoomsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
