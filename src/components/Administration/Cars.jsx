import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CarFront } from 'lucide-react';

const Cars = () => {
  const cars = [
    { id: 1, carNo: 'CAR001', plateNo: '34 ABC 123', status: 'Active' },
    { id: 2, carNo: 'CAR002', plateNo: '34 DEF 456', status: 'Maintenance' },
    { id: 3, carNo: 'CAR003', plateNo: '34 GHI 789', status: 'Inactive' }
  ];

  const getStatusVariant = (status) => {
    switch(status) {
      case 'Active': return 'default';
      case 'Maintenance': return 'secondary';
      case 'Inactive': return 'destructive';
      default: return 'default';
    }
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
            <TableHead className="w-[100px] font-bold text-gray-700">Car No</TableHead>
            <TableHead className="font-bold text-gray-700">Plate No</TableHead>
            <TableHead className="text-right font-bold text-gray-700">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-800">{car.carNo}</TableCell>
              <TableCell className="text-gray-600">{car.plateNo}</TableCell>
              <TableCell className="text-right">
                <Badge className="p-2" variant={getStatusVariant(car.status)}>
                  {car.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Cars;