import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { CarFront, Edit, History, X } from 'lucide-react';

const Cars = () => {
  const [cars, setCars] = useState([
    { 
      id: 1, 
      carNo: 'CAR001', 
      plateNo: '34 ABC 123', 
      status: 'Active',
      history: [
        { date: '2024-01-15', action: 'Purchased', details: 'New vehicle added to fleet' },
        { date: '2024-02-20', action: 'Maintenance', details: 'Regular service check' }
      ]
    },
    { 
      id: 2, 
      carNo: 'CAR002', 
      plateNo: '34 DEF 456', 
      status: 'Maintenance',
      history: [
        { date: '2024-03-10', action: 'Maintenance', details: 'Engine repair' }
      ]
    },
    { 
      id: 3, 
      carNo: 'CAR003', 
      plateNo: '34 GHI 789', 
      status: 'Inactive',
      history: [
        { date: '2024-01-05', action: 'Decommissioned', details: 'Retired from service' }
      ]
    }
  ]);

  const [editingCar, setEditingCar] = useState(null);
  const [historyModalCar, setHistoryModalCar] = useState(null);

  const getStatusVariant = (status) => {
    switch(status) {
      case 'Active': return 'accent';
      case 'Maintenance': return 'secondary';
      case 'Inactive': return 'destructive';
      default: return 'outline';
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
  };

  const handleUpdateCar = () => {
    setCars(cars.map(car => 
      car.id === editingCar.id ? editingCar : car
    ));
    setEditingCar(null);
  };

  const handleViewHistory = (car) => {
    setHistoryModalCar(car);
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center bg-teal-50 p-4 border-b">
        <CarFront className="w-6 h-6 mr-3 text-teal-600" />
        <h2 className="text-xl font-bold text-teal-800">Car Fleet Management</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            <TableHead className="font-bold text-gray-700">Car No</TableHead>
            <TableHead className="font-bold text-gray-700">Plate No</TableHead>
            <TableHead className="font-bold text-gray-700">Status</TableHead>
            <TableHead className="font-bold text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-800">{car.carNo}</TableCell>
              <TableCell className="text-gray-600">{car.plateNo}</TableCell>
              <TableCell>
                <Badge className="p-2" variant={getStatusVariant(car.status)}>
                  {car.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditCar(car)}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleViewHistory(car)}
                  >
                    <History className="w-4 h-4 mr-2" /> History
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Car Dialog */}
      <Dialog open={!!editingCar} onOpenChange={() => setEditingCar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Car Details</DialogTitle>
            <DialogDescription>
              Update information for {editingCar?.carNo}
            </DialogDescription>
          </DialogHeader>
          {editingCar && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Car Number</label>
                <input
                  type="text"
                  value={editingCar.carNo}
                  onChange={(e) => setEditingCar({...editingCar, carNo: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                <input
                  type="text"
                  value={editingCar.plateNo}
                  onChange={(e) => setEditingCar({...editingCar, plateNo: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editingCar.status}
                  onChange={(e) => setEditingCar({...editingCar, status: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <Button onClick={handleUpdateCar} className="w-full">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Car History Modal */}
      <Dialog open={!!historyModalCar} onOpenChange={() => setHistoryModalCar(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Car History for {historyModalCar?.carNo}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setHistoryModalCar(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto">
            {historyModalCar?.history.map((entry, index) => (
              <div 
                key={index} 
                className="border-b py-3 last:border-b-0"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-gray-600">{entry.date}</span>
                  <Badge variant="secondary" className="text-xs">{entry.action}</Badge>
                </div>
                <p className="text-gray-700 text-sm">{entry.details}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cars;