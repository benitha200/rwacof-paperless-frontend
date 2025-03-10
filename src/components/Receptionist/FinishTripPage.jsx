// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent
// } from '@/components/ui/card';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import {
//   User,
//   Calendar,
//   MapPin,
//   Car as CarIcon,
//   Clock,
//   Navigation,
//   FileText,
//   ArrowLeftRightIcon
// } from 'lucide-react';
// import API_URL from '../../constants/Constants';
// import { Button } from '@/components/ui/button';
// import FinishTripModal from './FinishTripModal1';
// import { TripOrigin, TripOriginRounded } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const FinishTripPage = () => {
//   const navigate = useNavigate();
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTripToFinish, setSelectedTripToFinish] = useState(null);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // Retrieve token and user ID from localStorage
//     const token = localStorage.getItem('token');
//     const storedUserId = localStorage.getItem('userId');
//     setUserId(storedUserId);

//     const fetchTrips = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/trips`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch trips');
//         }

//         const data = await response.json();
//         setTrips(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);



//   const getStatusBadgeVariant = (status) => {
//     switch (status) {
//       case 'PENDING':
//         return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//       case 'SUPERVISOR_APPROVED':
//         return 'bg-blue-100 text-blue-800 border border-blue-200';
//       case 'ASSIGNED':
//         return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
//       case 'COMPLETED':
//         return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
//       case 'REJECTED':
//         return 'bg-red-100 text-red-800 border border-red-200';
//       case 'IN_PROGRESS':
//         return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
//       default:
//         return 'bg-gray-100 text-gray-800 border border-gray-200';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const handleFinishTrip = (finishedTrip) => {
//     // Update the trips list with the finished trip
//     setTrips((prevTrips) =>
//       prevTrips.map((trip) =>
//         trip.id === finishedTrip.id ? finishedTrip : trip
//       )
//     );
//     setSelectedTripToFinish(null);
//   };

//   if (loading) return <div>Loading trips...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <Button 
//         className="w-md-1/12 w-sm-1/6 mt-4"
//         onClick={() => navigate('/trip/create')}
//       >
//         <ArrowLeftRightIcon className="ml-2 h-4 w-4" />
//         Add New Trip
//       </Button>
//       <div className="p-6 space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center mb-6">
//               <MapPin className="mr-4" /> All Trips
//             </CardTitle>


//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Employee</TableHead>
//                   <TableHead>Trip Details</TableHead>
//                   <TableHead>Dates</TableHead>
//                   <TableHead>Vehicle</TableHead>
//                   <TableHead>Kilometers</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {trips.map((trip) => (
//                   <TableRow key={trip.id}>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <User className="mr-2 h-4 w-4" />
//                         {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}

//                       </div>
//                       <div className="mr-2 text-sm text-muted-foreground">
//                         {trip.employee?.employeeNumber}
//                       </div>
//                       <div className="text-sm text-muted-foreground">
//                         {trip.employee?.department}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         <FileText className="mr-2 h-4 w-4" />
//                         <div>
//                           <div>{trip.reason}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {trip.itinerary}
//                           </div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <div className="flex items-center mb-1">
//                           <Calendar className="mr-2 h-4 w-4" />
//                           <span>Departure: {formatDate(trip.departureDate)}</span>
//                         </div>
//                         <div className="flex items-center">
//                           <Clock className="mr-2 h-4 w-4" />
//                           <span>Return: {formatDate(trip.returnDate)}</span>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {trip.car ? (
//                         <div className="flex flex-col">
//                           <div className="flex items-center">
//                             <CarIcon className="mr-2 h-4 w-4" />
//                             {trip.car.make} {trip.car.model}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             Plate: {trip.car.licensePlate}
//                           </div>
//                           <div className="text-sm text-muted-foreground">
//                             Year: {trip.car.year}
//                           </div>
//                         </div>
//                       ) : (
//                         'No car assigned'
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <div className="flex items-center">
//                           <Navigation className="mr-2 h-4 w-4" />
//                           <span>Start: {trip.kmAtDeparture} km</span>
//                         </div>
//                         <div className="flex items-center">
//                           <Navigation className="mr-2 h-4 w-4" />
//                           <span>End: {trip.kmAtArrival} km</span>
//                         </div>
//                         <div className="text-sm text-muted-foreground">
//                           Total: {trip.kmAtArrival - trip.kmAtDeparture} km
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
//                       >
//                         {trip.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {trip.status === 'ASSIGNED' && (
//                         <Button
//                           size="sm"
//                           onClick={() => setSelectedTripToFinish(trip)}
//                         >
//                           Finish Trip
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>

//         {/* Finish Trip Modal */}
//         <FinishTripModal
//           open={!!selectedTripToFinish}
//           onClose={() => setSelectedTripToFinish(null)}
//           tripId={selectedTripToFinish?.id}
//           userId={userId}
//           onTripFinished={handleFinishTrip}
//         />
//       </div>
//     </div>

//   );
// };

// export default FinishTripPage;

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Calendar,
  MapPin,
  Car as CarIcon,
  Clock,
  Navigation,
  FileText,
  ArrowLeftRight
} from 'lucide-react';
import API_URL from '../../constants/Constants';
import { Button } from '@/components/ui/button';
import FinishTripModal from './FinishTripModal1';
import { useNavigate } from 'react-router-dom';

const FinishTripPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTripToFinish, setSelectedTripToFinish] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve token and user ID from localStorage
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    const fetchTrips = async () => {
      try {
        const response = await fetch(`${API_URL}/api/trips`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }

        const data = await response.json();
        setTrips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'SUPERVISOR_APPROVED':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'ASSIGNED':
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'IN_PROGRESS':
        return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFinishTrip = (finishedTrip) => {
    // Update the trips list with the finished trip
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === finishedTrip.id ? finishedTrip : trip
      )
    );
    setSelectedTripToFinish(null);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Loading trips...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-red-500">Error: {error}</div>
    </div>
  );

  return (
    <div className="w-full px-4 md:px-6">
      <div className="my-4">
        <Button 
          className="w-full sm:w-auto"
          onClick={() => navigate('/trip/create')}
        >
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Add New Trip
        </Button>
      </div>
      
      <div className="space-y-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center text-xl md:text-2xl">
              <MapPin className="mr-2 h-5 w-5" /> All Trips
            </CardTitle>
          </CardHeader>
          
          {/* Desktop view: Full table */}
          <CardContent className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Trip Details</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Kilometers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {trip.employee?.user?.firstName} {trip.employee?.user?.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trip.employee?.employeeNumber}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trip.employee?.department}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <div>
                          <div>{trip.reason}</div>
                          <div className="text-sm text-muted-foreground">
                            {trip.itinerary}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Departure: {formatDate(trip.departureDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>Return: {formatDate(trip.returnDate)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {trip.car ? (
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <CarIcon className="mr-2 h-4 w-4" />
                            {trip.car.make} {trip.car.model}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Plate: {trip.car.licensePlate}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Year: {trip.car.year}
                          </div>
                        </div>
                      ) : (
                        'No car assigned'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Navigation className="mr-2 h-4 w-4" />
                          <span>Start: {trip.kmAtDeparture} km</span>
                        </div>
                        <div className="flex items-center">
                          <Navigation className="mr-2 h-4 w-4" />
                          <span>End: {trip.kmAtArrival || '—'} km</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total: {trip.kmAtArrival ? (trip.kmAtArrival - trip.kmAtDeparture) : '—'} km
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`p-2 ${getStatusBadgeVariant(trip.status)}`}
                      >
                        {trip.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {trip.status === 'ASSIGNED' && (
                        <Button
                          size="sm"
                          onClick={() => setSelectedTripToFinish(trip)}
                        >
                          Finish Trip
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          
          {/* Mobile view: Card-based layout */}
          <CardContent className="md:hidden space-y-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">{trip.employee?.user?.firstName} {trip.employee?.user?.lastName}</div>
                      <div className="text-sm text-muted-foreground">{trip.employee?.employeeNumber}</div>
                    </div>
                  </div>
                  <Badge className={`p-1 ${getStatusBadgeVariant(trip.status)}`}>
                    {trip.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Trip Details</div>
                    <div className="flex items-start">
                      <FileText className="mr-2 h-4 w-4 mt-1" />
                      <div>
                        <div>{trip.reason}</div>
                        <div className="text-sm text-muted-foreground">{trip.itinerary}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Dates</div>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="text-sm">Departure: {formatDate(trip.departureDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        <span className="text-sm">Return: {formatDate(trip.returnDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {trip.car && (
                    <div>
                      <div className="text-sm font-medium mb-1">Vehicle</div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <CarIcon className="mr-2 h-4 w-4" />
                          <span className="text-sm">{trip.car.make} {trip.car.model}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Plate: {trip.car.licensePlate}</div>
                        <div className="text-sm text-muted-foreground">Year: {trip.car.year}</div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Kilometers</div>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Navigation className="mr-2 h-4 w-4" />
                        <span className="text-sm">Start: {trip.kmAtDeparture} km</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation className="mr-2 h-4 w-4" />
                        <span className="text-sm">End: {trip.kmAtArrival || '—'} km</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total: {trip.kmAtArrival ? (trip.kmAtArrival - trip.kmAtDeparture) : '—'} km
                      </div>
                    </div>
                  </div>
                  
                  {trip.status === 'ASSIGNED' && (
                    <div className="mt-2">
                      <Button
                        className="w-full"
                        onClick={() => setSelectedTripToFinish(trip)}
                      >
                        Finish Trip
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Finish Trip Modal */}
        <FinishTripModal
          open={!!selectedTripToFinish}
          onClose={() => setSelectedTripToFinish(null)}
          tripId={selectedTripToFinish?.id}
          userId={userId}
          onTripFinished={handleFinishTrip}
        />
      </div>
    </div>
  );
};

export default FinishTripPage;