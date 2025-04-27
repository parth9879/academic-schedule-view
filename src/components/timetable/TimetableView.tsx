
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

export type TimetableEntry = {
  id: string;
  subjectId: string;
  roomId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  timeStart: string;
  timeEnd: string;
  subject: Subject;
  room: Room;
};

type TimetableViewProps = {
  entries: TimetableEntry[];
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const TimetableView: React.FC<TimetableViewProps> = ({ entries }) => {
  // Function to find entry for a specific day and time
  const findEntry = (day: string, time: string) => {
    return entries.find(entry => 
      entry.day === day && 
      entry.timeStart <= time && 
      entry.timeEnd > time
    );
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-0">
        <div className="timetable-grid">
          {/* Empty top-left corner */}
          <div className="timetable-cell"></div>
          
          {/* Days header */}
          {days.map((day) => (
            <div key={day} className="timetable-cell timetable-header">
              {day}
            </div>
          ))}
          
          {/* Time slots and class entries */}
          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              {/* Time slot */}
              <div className="timetable-cell timetable-time">
                {time}
              </div>
              
              {/* Class entries for each day */}
              {days.map((day) => {
                const entry = findEntry(day, time);
                
                return entry ? (
                  <TooltipProvider key={`${day}-${time}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="timetable-cell subject-cell">
                          <div className="text-center">
                            <div className="font-medium">{entry.subject.name}</div>
                            <div className="text-xs">Room: {entry.room.name}</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-sm">
                          <p className="font-bold">{entry.subject.name}</p>
                          <p>Room: {entry.room.name}</p>
                          <p>Time: {entry.timeStart} - {entry.timeEnd}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div key={`${day}-${time}`} className="timetable-cell"></div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableView;
