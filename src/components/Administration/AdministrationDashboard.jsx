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

// const AdministrationDashboard = () => {
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

//     console.log(busyCars);

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
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

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

// export default AdministrationDashboard;


import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Car, TrendingUp, AlertCircle, Calendar, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import API_URL from '../../constants/Constants';

const AdministrationDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [carStats, setCarStats] = useState([]);
  const [topRoutes, setTopRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/trips`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trip data');
      }

      const data = await response.json();
      setTrips(data);

      if (data && data.length > 0) {
        calculateInsights(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateInsights = (tripData) => {
    // Calculate car usage statistics
    const carUsageMap = new Map();
    const routeFrequency = new Map();

    tripData.forEach(trip => {
      if (trip.car) {
        // Track car usage
        const carKey = trip.car.licensePlate;
        const currentCarStats = carUsageMap.get(carKey) || {
          licensePlate: carKey,
          make: trip.car.make,
          model: trip.car.model,
          totalTrips: 0,
          totalKm: 0,
          trips: []
        };

        currentCarStats.totalTrips += 1;
        if (trip.kmAtDeparture && trip.kmAtArrival) {
          currentCarStats.totalKm += (trip.kmAtArrival - trip.kmAtDeparture);
        }
        currentCarStats.trips.push(trip);
        carUsageMap.set(carKey, currentCarStats);

        // Track route frequency
        const route = trip.itinerary;
        routeFrequency.set(route, (routeFrequency.get(route) || 0) + 1);
      }
    });

    // Convert to arrays and sort
    const sortedCarStats = Array.from(carUsageMap.values())
      .sort((a, b) => b.totalTrips - a.totalTrips);

    const sortedRoutes = Array.from(routeFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([route, count]) => ({ route, count }));

    setCarStats(sortedCarStats);
    setTopRoutes(sortedRoutes.slice(0, 5));

    // Calculate monthly trends
    const monthlyData = tripData.reduce((acc, trip) => {
      const month = new Date(trip.departureDate).toLocaleString('default', { month: 'short' });
      const existing = acc.find(m => m.month === month);
      if (existing) {
        existing.trips += 1;
        if (trip.kmAtDeparture && trip.kmAtArrival) {
          existing.totalKm += (trip.kmAtArrival - trip.kmAtDeparture);
        }
      } else {
        acc.push({
          month,
          trips: 1,
          totalKm: (trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)
        });
      }
      return acc;
    }, []);

    setMonthlyStats(monthlyData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>
          Error loading dashboard: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!trips.length) {
    return (
      <Alert className="m-4">
        <AlertDescription>
          No trip data available to display.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Trends Chart */}

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" /> Monthly Trip Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" className="text-gray-200" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#666' }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#666' }}
                  label={{
                    value: 'Number of Trips',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#6366f1' }
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#666' }}
                  axisLine={{ stroke: '#666' }}
                  label={{
                    value: 'Total Kilometers',
                    angle: 90,
                    position: 'insideRight',
                    style: { fill: '#22c55e' }
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    paddingTop: '20px'
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="trips"
                  name="Number of Trips"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalKm"
                  name="Total Kilometers"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#22c55e' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" /> Most Frequent Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Frequency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRoutes.map((route, index) => (
                  <TableRow key={index}>
                    <TableCell>{route.route}</TableCell>
                    <TableCell>{route.count} trips</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="mr-2" /> Vehicle Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Total Trips</TableHead>
                <TableHead>Total KM</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carStats.map((car, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {car.make} {car.model} ({car.licensePlate})
                  </TableCell>
                  <TableCell>{car.totalTrips}</TableCell>
                  <TableCell>{car.totalKm} km</TableCell>
                  <TableCell>
                    {((car.totalTrips / trips.length) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Maintenance Alerts */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2" /> Maintenance Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {carStats.map((car, index) => {
              const kmThisMonth = car.trips
                .filter(trip => new Date(trip.departureDate).getMonth() === new Date().getMonth())
                .reduce((sum, trip) => sum + ((trip.kmAtArrival || 0) - (trip.kmAtDeparture || 0)), 0);

              return kmThisMonth > 5000 ? (
                <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <AlertCircle className="text-yellow-500 mr-2" />
                  <span>
                    {car.licensePlate} has covered {kmThisMonth}km this month. Consider scheduling maintenance.
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default AdministrationDashboard;