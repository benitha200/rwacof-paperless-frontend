import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Car, User, MapPin, Calendar, CheckCircle, XCircle 
} from 'lucide-react';

const AdministrationDashboard = () => {
  const [cars, setCars] = useState([
    { id: 1, model: 'Toyota Camry', status: 'Available', licensePlate: 'ABC123' },
    { id: 2, model: 'Ford Explorer', status: 'On Trip', licensePlate: 'XYZ789' },
    { id: 3, model: 'Honda Civic', status: 'Maintenance', licensePlate: 'DEF456' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Doe', status: 'Available' },
    { id: 2, name: 'Jane Smith', status: 'On Trip' },
    { id: 3, name: 'Mike Johnson', status: 'Available' }
  ]);

  const [trips, setTrips] = useState([
    { 
      id: 1, 
      driver: 'Jane Smith', 
      car: 'Ford Explorer', 
      destination: 'Client Meeting', 
      date: '2024-02-15', 
      status: 'Pending Approval' 
    },
    { 
      id: 2, 
      driver: 'John Doe', 
      car: 'Toyota Camry', 
      destination: 'Site Inspection', 
      date: '2024-02-16', 
      status: 'Requested' 
    }
  ]);

  const approveTrip = (tripId) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { ...trip, status: 'Approved' } 
        : trip
    ));
  };

  const rejectTrip = (tripId) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { ...trip, status: 'Rejected' } 
        : trip
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Car & Driver Management</h1>
          <p className="text-sm text-gray-700">Trip Assignment and Vehicle Status</p>
        </div>
      </div>

      {/* Trip Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trips.map((trip) => (
              <div 
                key={trip.id} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{trip.driver}</p>
                    <p className="text-sm text-gray-500">
                      {trip.destination} on {trip.date}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => approveTrip(trip.id)}
                    className="text-green-500 hover:bg-green-100 p-2 rounded"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => rejectTrip(trip.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status</CardTitle>
          </CardHeader>
          <CardContent>
            {cars.map((car) => (
              <div 
                key={car.id} 
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <Car className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{car.model}</p>
                    <p className="text-sm text-gray-500">{car.licensePlate}</p>
                  </div>
                </div>
                <span 
                  className={`px-3 py-1 rounded-full text-xs ${
                    car.status === 'Available' ? 'bg-green-100 text-green-800' :
                    car.status === 'On Trip' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {car.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Driver Status */}
        <Card>
          <CardHeader>
            <CardTitle>Driver Status</CardTitle>
          </CardHeader>
          <CardContent>
            {drivers.map((driver) => (
              <div 
                key={driver.id} 
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <User className="h-5 w-5 text-blue-500" />
                  <p className="font-medium">{driver.name}</p>
                </div>
                <span 
                  className={`px-3 py-1 rounded-full text-xs ${
                    driver.status === 'Available' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {driver.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdministrationDashboard;