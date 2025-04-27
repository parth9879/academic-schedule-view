
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type Room = {
  id: string;
  name: string;
  capacity: number;
};

// Mock data
const initialRooms: Room[] = [
  { id: '101', name: 'Lab A', capacity: 30 },
  { id: '102', name: 'Room 102', capacity: 40 },
  { id: '103', name: 'Room 103', capacity: 25 },
  { id: '104', name: 'Lab B', capacity: 20 },
  { id: '105', name: 'Room 105', capacity: 35 },
];

const RoomsManager = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  
  const [roomName, setRoomName] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');
  
  const { toast } = useToast();
  
  const handleAddRoom = () => {
    if (!roomName || !roomCapacity) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const newRoom: Room = {
      id: Date.now().toString(),
      name: roomName,
      capacity: parseInt(roomCapacity)
    };
    
    setRooms([...rooms, newRoom]);
    setRoomName('');
    setRoomCapacity('');
    setIsAddingRoom(false);
    
    toast({
      title: "Success",
      description: "Room added successfully",
    });
  };
  
  const handleEditRoom = () => {
    if (!editingRoom || !roomName || !roomCapacity) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedRoom: Room = {
      ...editingRoom,
      name: roomName,
      capacity: parseInt(roomCapacity)
    };
    
    setRooms(rooms.map(room => 
      room.id === editingRoom.id ? updatedRoom : room
    ));
    
    setEditingRoom(null);
    setRoomName('');
    setRoomCapacity('');
    
    toast({
      title: "Success",
      description: "Room updated successfully",
    });
  };
  
  const handleStartEditing = (room: Room) => {
    setEditingRoom(room);
    setRoomName(room.name);
    setRoomCapacity(room.capacity.toString());
    setIsAddingRoom(false);
  };
  
  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
    
    toast({
      title: "Success",
      description: "Room deleted successfully",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Rooms</h2>
        
        {!isAddingRoom && !editingRoom && (
          <Button onClick={() => setIsAddingRoom(true)}>
            <Plus size={16} className="mr-2" />
            Add Room
          </Button>
        )}
      </div>
      
      {(isAddingRoom || editingRoom) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roomName">Room Name</Label>
                  <Input 
                    id="roomName"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="e.g., Lab A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomCapacity">Capacity</Label>
                  <Input 
                    id="roomCapacity"
                    type="number"
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(e.target.value)}
                    placeholder="e.g., 30"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingRoom(false);
                    setEditingRoom(null);
                    setRoomName('');
                    setRoomCapacity('');
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingRoom ? handleEditRoom : handleAddRoom}>
                  {editingRoom ? 'Update' : 'Add'} Room
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room Name</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleStartEditing(room)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteRoom(room.id)}
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

export default RoomsManager;
