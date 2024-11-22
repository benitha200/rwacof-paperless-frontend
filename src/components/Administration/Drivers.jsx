import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, Phone, Mail, Car, CheckCircle, XCircle 
} from 'lucide-react';

const Drivers = () => {
  const [drivers, setDrivers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@company.com', 
      phone: '(555) 123-4567',
      status: 'Active',
      assignedVehicle: 'Toyota Camry',
      licenseNumber: 'DL12345'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@company.com', 
      phone: '(555) 987-6543',
      status: 'Inactive',
      assignedVehicle: 'Ford Explorer',
      licenseNumber: 'DL67890'
    }
  ]);

  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver(prev => ({ ...prev, [name]: value }));
  };

  const addDriver = () => {
    if (newDriver.name && newDriver.email) {
      setDrivers([
        ...drivers, 
        {
          ...newDriver,
          id: drivers.length + 1,
          status: 'Active',
          assignedVehicle: 'Unassigned'
        }
      ]);
      // Reset form
      setNewDriver({ name: '', email: '', phone: '', licenseNumber: '' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-700">Driver Management</h1>
        <p className="text-sm text-gray-700">Manage and track driver information</p>
      </div>

      {/* Driver List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          {drivers.map((driver) => (
            <div 
              key={driver.id} 
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{driver.name}</p>
                  <p className="text-sm text-gray-500">{driver.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span 
                  className={`px-3 py-1 rounded-full text-xs ${
                    driver.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {driver.status}
                </span>
                <Car className="h-5 w-5 text-gray-500" />
                <span className="text-sm">{driver.assignedVehicle}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add New Driver */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Driver</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={newDriver.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={newDriver.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="phone"
              value={newDriver.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="licenseNumber"
              value={newDriver.licenseNumber}
              onChange={handleInputChange}
              placeholder="License Number"
              className="border p-2 rounded"
            />
            <button 
              onClick={addDriver}
              className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Driver
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Drivers;