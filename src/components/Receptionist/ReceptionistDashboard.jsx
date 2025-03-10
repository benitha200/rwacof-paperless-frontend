// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Car, MapPin, Clock, Calendar, User, AlertTriangle } from 'lucide-react';
// import API_URL from '@/constants/Constants';

// const ReceptionistDashboard = () => {
//   const [activeTrips, setActiveTrips] = useState([]);
//   const [completedTrips, setCompletedTrips] = useState([]);
//   const [overdueTrips, setOverdueTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`${API_URL}/api/trips`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch trips');
//         }

//         const data = await response.json();
//         const now = new Date();

//         // Separate trips into different categories
//         // const sortedTrips = data.reduce((acc, trip) => {
//         //   const returnDate = new Date(trip.returnDate);
          
//         //   if (trip.status === 'COMPLETED') {
//         //     acc.completed.push(trip);
//         //   } else if (returnDate < now) {
//         //     acc.overdue.push(trip);
//         //   } else {
//         //     acc.active.push(trip);
//         //   }
//         //   return acc;
//         // }, { active: [], completed: [], overdue: [] });

//         const sortedTrips = data.reduce((acc, trip) => {
//           const returnDate = new Date(trip.returnDate);
//           const departureDate = new Date(trip.departureDate);
          
//           if (trip.status === 'COMPLETED') {
//             acc.completed.push(trip);
//           } else if (trip.status === 'ASSIGNED' && departureDate <= now && returnDate < now) {
//             // Only mark as overdue if:
//             // 1. The trip has been assigned
//             // 2. The departure time has passed
//             // 3. The return time has passed
//             acc.overdue.push(trip);
//           } else {
//             acc.active.push(trip);
//           }
//           return acc;
//         }, { active: [], completed: [], overdue: [] });

//         setActiveTrips(sortedTrips.active);
//         setCompletedTrips(sortedTrips.completed);
//         setOverdueTrips(sortedTrips.overdue);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);

//   const getTripStats = () => {
//     const totalDistance = [...completedTrips, ...overdueTrips].reduce((acc, trip) => 
//       acc + ((trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)), 0);
    
//     return {
//       totalTrips: completedTrips.length + activeTrips.length + overdueTrips.length,
//       activeTrips: activeTrips.length,
//       completedTrips: completedTrips.length,
//       overdueTrips: overdueTrips.length,
//       totalDistance
//     };
//   };

//   // const getStatusBadge = (trip) => {
//   //   const returnDate = new Date(trip.returnDate);
//   //   const now = new Date();
    
//   //   if (trip.status === 'COMPLETED') {
//   //     return (
//   //       <Badge className="bg-green-500 p-2">
//   //         {trip.status}
//   //       </Badge>
//   //     );
//   //   } else if (returnDate < now) {
//   //     return (
//   //       <Badge className="bg-red-500 p-2 flex items-center gap-1">
//   //         <AlertTriangle className="h-4 w-4" />
//   //         OVERDUE
//   //       </Badge>
//   //     );
//   //   } else {
//   //     return (
//   //       <Badge className="bg-blue-500 p-2">
//   //         IN PROGRESS
//   //       </Badge>
//   //     );
//   //   }
//   // };


//   const getStatusBadge = (trip) => {
//     const returnDate = new Date(trip.returnDate);
//     const departureDate = new Date(trip.departureDate);
//     const now = new Date();
    
//     if (trip.status === 'COMPLETED') {
//       return (
//         <Badge className="bg-green-500 p-2">
//           {trip.status}
//         </Badge>
//       );
//     } else if (trip.status === 'ASSIGNED' && departureDate <= now && returnDate < now) {
//       return (
//         <Badge className="bg-red-500 p-2 flex items-center gap-1">
//           <AlertTriangle className="h-4 w-4" />
//           OVERDUE
//         </Badge>
//       );
//     } else {
//       return (
//         <Badge className="bg-blue-500 p-2">
//           IN PROGRESS
//         </Badge>
//       );
//     }
//   };

//   const TripItem = ({ trip }) => (
//     <Card className="mb-4">
//       <CardContent className="pt-4">
//         <div className="flex justify-between items-start flex-wrap gap-2">
//           <div className="min-w-0 flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <User className="h-4 w-4 flex-shrink-0" />
//               <span className="font-medium truncate">
//                 {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 mb-1">
//               <MapPin className="h-4 w-4 flex-shrink-0" />
//               <span className="truncate">{trip.itinerary}</span>
//             </div>
//             <div className="text-sm text-gray-500 pl-6 mb-2">{trip.reason}</div>
//           </div>
//           <div>{getStatusBadge(trip)}</div>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
//           <div className="flex items-center gap-2">
//             <Car className="h-4 w-4 flex-shrink-0" />
//             <div>
//               <div className="truncate">{trip.car?.licensePlate}</div>
//               <div className="text-sm text-gray-500">
//                 Driver: {trip.driver?.firstName} {trip.driver?.lastName}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <Clock className="h-4 w-4 flex-shrink-0" />
//             <div>
//               <div>{trip.departureTime} - {trip.returnTime}</div>
//               <div className="text-sm text-gray-500">
//                 {(trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)} km
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const stats = getTripStats();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 md:p-6 text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-4 md:space-y-6">
//       <h1 className="text-xl md:text-2xl font-bold">Trip Management Dashboard</h1>

//       {/* Trip Statistics */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
//         <Card className="bg-white">
//           <CardContent className="p-4">
//             <div className="text-xl md:text-2xl font-bold">{stats.totalTrips}</div>
//             <div className="text-xs md:text-sm text-gray-500">Total Trips</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
//           <CardContent className="p-4">
//             <div className="text-xl md:text-2xl font-bold">{stats.activeTrips}</div>
//             <div className="text-xs md:text-sm text-gray-500">Active Trips</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
//           <CardContent className="p-4">
//             <div className="text-xl md:text-2xl font-bold text-red-500">{stats.overdueTrips}</div>
//             <div className="text-xs md:text-sm text-gray-500">Overdue Trips</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
//           <CardContent className="p-4">
//             <div className="text-xl md:text-2xl font-bold">{stats.completedTrips}</div>
//             <div className="text-xs md:text-sm text-gray-500">Completed Trips</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-white sm:col-span-3 lg:col-span-1">
//           <CardContent className="p-4">
//             <div className="text-xl md:text-2xl font-bold">{stats.totalDistance} km</div>
//             <div className="text-xs md:text-sm text-gray-500">Total Distance</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* All Trips */}
//       <Card>
//         <CardHeader className="pb-0 md:pb-2">
//           <CardTitle className="text-lg md:text-xl flex items-center gap-2">
//             <Clock className="h-5 w-5" />
//             All Trips
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Desktop table view */}
//           <div className="hidden md:block">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Employee</TableHead>
//                   <TableHead>Trip Details</TableHead>
//                   <TableHead>Vehicle & Driver</TableHead>
//                   <TableHead>Time & Distance</TableHead>
//                   <TableHead>Status</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {[...overdueTrips, ...activeTrips, ...completedTrips].map(trip => (
//                   <TableRow key={trip.id} className={new Date(trip.returnDate) < new Date() && trip.status !== 'COMPLETED' ? 'bg-red-50' : ''}>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <User className="h-4 w-4" />
//                         <span>{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <MapPin className="h-4 w-4" />
//                           <span>{trip.itinerary}</span>
//                         </div>
//                         <div className="text-sm text-gray-500">{trip.reason}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <Car className="h-4 w-4" />
//                           <span>{trip.car?.licensePlate}</span>
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           Driver: {trip.driver?.firstName} {trip.driver?.lastName}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2">
//                           <Clock className="h-4 w-4" />
//                           <span>{trip.departureTime} - {trip.returnTime}</span>
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {(trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)} km
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {getStatusBadge(trip)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Mobile card view */}
//           <div className="md:hidden space-y-2">
//             {[...overdueTrips, ...activeTrips, ...completedTrips].map(trip => (
//               <TripItem key={trip.id} trip={trip} />
//             ))}
//           </div>
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
import API_URL from '@/constants/Constants';

const ReceptionistDashboard = () => {
  const [activeTrips, setActiveTrips] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_URL}/api/trips`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }

        const data = await response.json();

        const sortedTrips = data.reduce((acc, trip) => {
          if (trip.status === 'COMPLETED') {
            acc.completed.push(trip);
          } else {
            acc.active.push(trip);
          }
          return acc;
        }, { active: [], completed: [] });

        setActiveTrips(sortedTrips.active);
        setCompletedTrips(sortedTrips.completed);
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

  const getStatusBadge = (trip) => {
    if (trip.status === 'COMPLETED') {
      return (
        <Badge className="bg-green-500 p-2">
          {trip.status}
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-blue-500 p-2">
          IN PROGRESS
        </Badge>
      );
    }
  };
  
  const TripItem = ({ trip }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium truncate">
                {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{trip.itinerary}</span>
            </div>
            <div className="text-sm text-gray-500 pl-6 mb-2">{trip.reason}</div>
          </div>
          <div>{getStatusBadge(trip)}</div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 flex-shrink-0" />
            <div>
              <div className="truncate">{trip.car?.licensePlate}</div>
              <div className="text-sm text-gray-500">
                Driver: {trip.driver?.firstName} {trip.driver?.lastName}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <div>
              <div>{trip.departureTime} - {trip.returnTime}</div>
              <div className="text-sm text-gray-500">
                {(trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)} km
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
      <div className="p-4 md:p-6 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <h1 className="text-xl md:text-2xl font-bold">Trip Management Dashboard</h1>

      {/* Trip Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold">{stats.totalTrips}</div>
            <div className="text-xs md:text-sm text-gray-500">Total Trips</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold">{stats.activeTrips}</div>
            <div className="text-xs md:text-sm text-gray-500">Active Trips</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold">{stats.completedTrips}</div>
            <div className="text-xs md:text-sm text-gray-500">Completed Trips</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="text-xl md:text-2xl font-bold">{stats.totalDistance} km</div>
            <div className="text-xs md:text-sm text-gray-500">Total Distance</div>
          </CardContent>
        </Card>
      </div>

      {/* All Trips */}
      <Card>
        <CardHeader className="pb-0 md:pb-2">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <Clock className="h-5 w-5" />
            All Trips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop table view */}
          <div className="hidden md:block">
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
                {[...activeTrips, ...completedTrips].map(trip => (
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
                      {getStatusBadge(trip)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile card view */}
          <div className="md:hidden space-y-2">
            {[...activeTrips, ...completedTrips].map(trip => (
              <TripItem key={trip.id} trip={trip} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceptionistDashboard;