// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Car, User, Calendar, Clock } from 'lucide-react';
// import API_URL from '../../constants/Constants';

// const ReceptionistDashboard = () => {
//   const [trips, setTrips] = useState([]);
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Retrieve token from localStorage (adjust if stored differently)
//     const token = localStorage.getItem('token');

//     // Fetch trips
//     const fetchTrips = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/trips`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch trips');
//         }

//         const data = await response.json();
//         setTrips(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     // Fetch cars
//     const fetchCars = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/car`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch cars');
//         }

//         const data = await response.json();
//         // Map the cars from the response
//         setCars(data.cars);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Call both fetch functions
//     fetchTrips();
//     fetchCars();
//   }, []);

//   // Calculate car usage insights
//   const getCarInsights = () => {
//     const busyCars = cars.filter(car => car.status === 'IN_USE');
//     const availableCars = cars.filter(car => car.status === 'AVAILABLE');

//     return {
//       totalCars: cars.length,
//       busyCars: busyCars,
//       availableCars: availableCars,
//       busyPercentage: (busyCars.length / cars.length * 100).toFixed(2)
//     };
//   };

//   const carInsights = getCarInsights();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold mb-4">Receptionist Dashboard</h1>

//       {/* Car Usage Overview */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Car className="mr-2" /> Car Usage Overview
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="bg-blue-50 p-4 rounded">
//               <h3 className="text-lg font-semibold">Total Cars</h3>
//               <p className="text-2xl">{carInsights.totalCars}</p>
//             </div>
//             <div className="bg-green-50 p-4 rounded">
//               <h3 className="text-lg font-semibold">Available Cars</h3>
//               <p className="text-2xl">{carInsights.availableCars.length}</p>
//             </div>
//             <div className="bg-red-50 p-4 rounded">
//               <h3 className="text-lg font-semibold">Busy Cars</h3>
//               <p className="text-2xl">{carInsights.busyCars.length}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Busy Cars Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Car className="mr-2" /> Busy Cars Details
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>License Plate</TableHead>
//                 <TableHead>Make</TableHead>
//                 <TableHead>Model</TableHead>
//                 <TableHead>Year</TableHead>
//                 <TableHead>Current Trip Details</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {carInsights.busyCars.map(car => {
//                 const currentTrip = car.tripRequests && car.tripRequests[0];
//                 return (
//                   <TableRow key={car.id}>
//                     <TableCell>{car.licensePlate}</TableCell>
//                     <TableCell>{car.make}</TableCell>
//                     <TableCell>{car.model}</TableCell>
//                     <TableCell>{car.year}</TableCell>
//                     <TableCell>
//                       {currentTrip ? (
//                         <div>
//                           <div className="flex items-center">
//                             <User className="mr-2 h-4 w-4" />
//                             {currentTrip.employee?.user?.firstName} {currentTrip.employee?.user?.lastName}
//                           </div>
//                           <div className="flex items-center">
//                             <Calendar className="mr-2 h-4 w-4" />
//                             {new Date(currentTrip.departureDate).toLocaleDateString()}
//                           </div>
//                           <div className="flex items-center">
//                             <Clock className="mr-2 h-4 w-4" />
//                             {/* {currentTrip.status} */}
//                             ASSIGNED CAR
//                           </div>
//                         </div>
//                       ) : 'No active trip'}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Available Cars Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Car className="mr-2" /> Available Cars
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>License Plate</TableHead>
//                 <TableHead>Make</TableHead>
//                 <TableHead>Model</TableHead>
//                 <TableHead>Year</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {carInsights.availableCars.map(car => (
//                 <TableRow key={car.id}>
//                   <TableCell>{car.licensePlate}</TableCell>
//                   <TableCell>{car.make}</TableCell>
//                   <TableCell>{car.model}</TableCell>
//                   <TableCell>{car.year}</TableCell>
//                   <TableCell>
//                     <Badge variant="default" className="bg-green-500 p-2">
//                       {car.status}
//                     </Badge>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ReceptionistDashboard;


import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Car, MapPin, Clock, Calendar, User } from 'lucide-react';

const ReceptionistDashboard = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://cherryapp.sucafina.com:8012/api/trips', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }

        const data = await response.json();
        setActiveTrips(data.filter(trip => trip.status !== 'COMPLETED'));
        setCompletedTrips(data.filter(trip => trip.status === 'COMPLETED'));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const getTripStats = () => {
    const totalDistance = completedTrips.reduce((acc, trip) => 
      acc + ((trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)), 0);
    
    return {
      totalTrips: completedTrips.length + activeTrips.length,
      activeTrips: activeTrips.length,
      completedTrips: completedTrips.length,
      totalDistance
    };
  };

  const stats = getTripStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Trip Management Dashboard</h1>

      {/* Trip Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.totalTrips}</div>
            <div className="text-sm text-gray-500">Total Trips</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.activeTrips}</div>
            <div className="text-sm text-gray-500">Active Trips</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.completedTrips}</div>
            <div className="text-sm text-gray-500">Completed Trips</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.totalDistance} km</div>
            <div className="text-sm text-gray-500">Total Distance</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Trip Details</TableHead>
                <TableHead>Vehicle & Driver</TableHead>
                <TableHead>Time & Distance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...completedTrips, ...activeTrips].map(trip => (
                <TableRow key={trip.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.itinerary}</span>
                      </div>
                      <div className="text-sm text-gray-500">{trip.reason}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <span>{trip.car?.licensePlate}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Driver: {trip.driver?.firstName} {trip.driver?.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{trip.departureTime} - {trip.returnTime}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {(trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)} km
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        trip.status === 'COMPLETED' 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                      }
                    >
                      {trip.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistDashboard;
