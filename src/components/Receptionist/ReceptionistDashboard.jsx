// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Car, MapPin, Clock, Calendar, User } from 'lucide-react';
// import API_URL from '@/constants/Constants';

// const ReceptionistDashboard = () => {
//   const [activeTrips, setActiveTrips] = useState([]);
//   const [completedTrips, setCompletedTrips] = useState([]);
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

//         const sortedTrips = data.reduce((acc, trip) => {
//           if (trip.status === 'COMPLETED') {
//             acc.completed.push(trip);
//           } else {
//             acc.active.push(trip);
//           }
//           return acc;
//         }, { active: [], completed: [] });

//         setActiveTrips(sortedTrips.active);
//         setCompletedTrips(sortedTrips.completed);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);

//   const getTripStats = () => {
//     const totalDistance = completedTrips.reduce((acc, trip) => 
//       acc + ((trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)), 0);
    
//     return {
//       totalTrips: completedTrips.length + activeTrips.length,
//       activeTrips: activeTrips.length,
//       completedTrips: completedTrips.length,
//       totalDistance
//     };
//   };

//   const getStatusBadge = (trip) => {
//     if (trip.status === 'COMPLETED') {
//       return (
//         <Badge className="bg-green-500 p-2">
//           {trip.status}
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
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
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
//             <div className="text-xl md:text-2xl font-bold">{stats.completedTrips}</div>
//             <div className="text-xs md:text-sm text-gray-500">Completed Trips</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-white">
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
//                 {[...activeTrips, ...completedTrips].map(trip => (
//                   <TableRow key={trip.id}>
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
//             {[...activeTrips, ...completedTrips].map(trip => (
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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
          {trip.status}
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-blue-500 text-white px-2 py-1 text-xs">
          IN PROGRESS
        </Badge>
      );
    }
  };
  
  const TripItem = ({ trip }) => (
    <div className="border rounded-lg p-3 mb-3 bg-white w-full shadow-sm hover:shadow transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start w-full">
        <div className="min-w-0 flex-1 mb-2 sm:mb-0">
          <div className="flex items-center mb-1">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="font-medium truncate text-sm">
              {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
            </span>
          </div>
          <div className="flex items-center mb-1">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate text-sm">{trip.itinerary}</span>
          </div>
          <div className="text-xs text-gray-500 pl-6 mb-2">{trip.reason}</div>
        </div>
        <div className="sm:ml-2 self-start">{getStatusBadge(trip)}</div>
      </div>
      
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex items-center">
          <Car className="h-4 w-4 mr-2 flex-shrink-0" />
          <div className="truncate">
            <div className="truncate text-sm">{trip.car?.licensePlate}</div>
            <div className="text-xs text-gray-500 truncate">
              Driver: {trip.driver?.firstName} {trip.driver?.lastName}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <div>
            <div className="text-sm">{trip.departureTime} - {trip.returnTime}</div>
            <div className="text-xs text-gray-500">
              {(trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)} km
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const stats = getTripStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 w-full">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Trip Management Dashboard</h1>

      {/* Trip Statistics */}
      <div className="grid grid-cols-1 lg:w-full sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Card className="shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden">
          <CardContent className="p-2 sm:p-4">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">{stats.totalTrips}</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Trips</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden">
          <CardContent className="p-2 sm:p-4">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">{stats.activeTrips}</div>
            <div className="text-xs sm:text-sm text-gray-500">Active Trips</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden">
          <CardContent className="p-2 sm:p-4">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">{stats.completedTrips}</div>
            <div className="text-xs sm:text-sm text-gray-500">Completed Trips</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden">
          <CardContent className="p-2 sm:p-4">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">{stats.totalDistance} km</div>
            <div className="text-xs sm:text-sm text-gray-500">Total Distance</div>
          </CardContent>
        </Card>
      </div>

      {/* All Trips */}
      <Card className="shadow-sm w-full mb-6 overflow-hidden">
        <CardHeader className="border-b p-3 sm:p-4 bg-gray-50">
          <CardTitle className="text-base sm:text-lg font-medium flex items-center">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            All Trips
          </CardTitle>
        </CardHeader>
        
        {/* Desktop table view */}
        <div className={windowWidth >= 768 ? "block overflow-x-auto" : "hidden"}>
          <Table>
            <TableHeader className="bg-gray-50 border-b">
              <TableRow>
                <TableHead className="text-left p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-500 w-1/6">Employee</TableHead>
                <TableHead className="text-left p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-500 w-1/4">Trip Details</TableHead>
                <TableHead className="text-left p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-500 w-1/6">Vehicle & Driver</TableHead>
                <TableHead className="text-left p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-500 w-1/6">Time & Distance</TableHead>
                <TableHead className="text-left p-2 sm:p-4 text-xs sm:text-sm font-medium text-gray-500 w-1/12">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...activeTrips, ...completedTrips].map(trip => (
                <TableRow key={trip.id} className="border-b hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="p-2 sm:p-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-xs sm:text-sm truncate">{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm truncate max-w-xs">{trip.itinerary}</span>
                      </div>
                      <div className="text-xs text-gray-500 pl-6 truncate">{trip.reason}</div>
                    </div>
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm truncate">{trip.car?.licensePlate}</span>
                      </div>
                      <div className="text-xs text-gray-500 pl-6 truncate">
                        Driver: {trip.driver?.firstName} {trip.driver?.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-xs sm:text-sm">{trip.departureTime} - {trip.returnTime}</span>
                      </div>
                      <div className="text-xs text-gray-500 pl-6">
                        {(trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)} km
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-2 sm:p-4">
                    {getStatusBadge(trip)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card view */}
        <CardContent className={windowWidth < 768 ? "block p-2 w-full " : "hidden"}>
          <div className="space-y-3">
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