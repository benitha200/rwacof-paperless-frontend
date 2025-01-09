// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   Car, User, MapPin, Calendar, CheckCircle, XCircle 
// } from 'lucide-react';
// import axios from 'axios';

// const EmployeeDashboard = () => {
//   const [cars, setCars] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch cars
//         const carsResponse = await axios.get('http://localhost:3001/api/car');
//         console.log(carsResponse);
//         setCars(carsResponse.data.cars);

//         // Fetch drivers
//         const driversResponse = await axios.get('http://localhost:3001/api/driver');
//         setDrivers(driversResponse.data);

//         // Fetch trips
//         const tripsResponse = await axios.get('http://localhost:3001/api/trips');
//         setTrips(tripsResponse.data);

//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const approveTrip = async (tripId) => {
//     try {
//       // Implement trip approval logic 
//       // This would typically involve an API call to update the trip status
//       const updatedTrips = trips.map(trip => 
//         trip.id === tripId 
//           ? { ...trip, status: 'APPROVED' } 
//           : trip
//       );
//       setTrips(updatedTrips);
//     } catch (err) {
//       console.error('Error approving trip:', err);
//     }
//   };

//   const rejectTrip = async (tripId) => {
//     try {
//       // Implement trip rejection logic
//       // This would typically involve an API call to update the trip status
//       const updatedTrips = trips.map(trip => 
//         trip.id === tripId 
//           ? { ...trip, status: 'REJECTED' } 
//           : trip
//       );
//       setTrips(updatedTrips);
//     } catch (err) {
//       console.error('Error rejecting trip:', err);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading data: {error.message}</div>;
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       <div className="flex flex-col md:flex-row md:justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-700">Car Availability</h1>
//           <p className="text-sm text-gray-700">Check cars Availability</p>
//         </div>
//       </div>

//       {/* Vehicle Status */}
//       <div className="grid md:grid-cols-1 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Vehicle Status</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {cars.map((car) => (
//               <div 
//                 key={car.id} 
//                 className="flex items-center justify-between p-4 border-b last:border-b-0"
//               >
//                 <div className="flex items-center space-x-4">
//                   <Car className="h-5 w-5 text-blue-500" />
//                   <div>
//                     <p className="font-medium">{car.make} {car.model}</p>
//                     <p className="text-sm text-gray-500">{car.licensePlate}</p>
//                   </div>
//                 </div>
//                 <span 
//                   className={`px-3 py-1 rounded-full text-xs ${
//                     car.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
//                     car.status === 'IN_USE' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}
//                 >
//                   {car.status}
//                 </span>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, MapPin, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [cars, setCars] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cars
        const carsResponse = await axios.get('http://localhost:3001/api/car');
        setCars(carsResponse.data.cars);

        // Fetch trips
        const tripsResponse = await axios.get(`http://localhost:3001/api/trips/user/${localStorage.getItem('userId')}`);
        setTrips(tripsResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'IN_USE':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-blue-500 animate-pulse" />
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <p className="text-xl text-red-600">Error loading dashboard</p>
          <p className="text-sm text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Vehicle and Trip Management</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Pending Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-indigo-500" />
              Pending Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trips.filter(trip => trip.status === 'PENDING').length > 0 ? (
                trips
                  .filter(trip => trip.status === 'PENDING')
                  .map((trip) => (
                    <div
                      key={trip.id}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-800">{trip.reason}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                            {trip.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(trip.departureDate).toLocaleDateString()} -
                              {new Date(trip.returnDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex items-center space-x-2 mt-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="text-green-600 hover:bg-green-50"
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="text-red-600 hover:bg-red-50"
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                            </div> */}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p>No pending trips</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Pending Reject */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-indigo-500" />
              Rejected Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trips.filter(trip => trip.status === 'REJECTED').length > 0 ? (
                trips
                  .filter(trip => trip.status === 'REJECTED')
                  .map((trip) => (
                    <div
                      key={trip.id}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-800">{trip.reason}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}>
                            {trip.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(trip.departureDate).toLocaleDateString()} -
                              {new Date(trip.returnDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {/* <div className="flex items-center space-x-2 mt-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="text-green-600 hover:bg-green-50"
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline" 
                                                    className="text-red-600 hover:bg-red-50"
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                            </div> */}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p>No pending trips</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="mr-2 h-6 w-6 text-blue-500" />
              Vehicle Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <Car className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{car.make} {car.model}</p>
                      <p className="text-sm text-gray-500">{car.licensePlate}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(car.status)}`}
                  >
                    {car.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default EmployeeDashboard;