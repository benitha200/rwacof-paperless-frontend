// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import API_URL from '../../constants/Constants';


// const LogisticsDashboard = () => {
//   const [shipments, setShipments] = useState([]);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchShipments = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/shipments`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch shipments');
//         }
//         const data = await response.json();
//         setShipments(data);
//       } catch (err) {
//         setError('Failed to load shipments. Please try again later.');
//         console.error('Error fetching shipments:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchShipments();
//   }, []);

//   const prepareChartData = () => {
//     const sortedShipments = [...shipments].sort((a, b) => new Date(a.date) - new Date(b.date));
//     return sortedShipments.map(shipment => ({
//       date: new Date(shipment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       shipments: 1, // Each entry represents one shipment
//     }));
//   };

//   const calculateStats = () => {
//     const totalShipments = shipments.length;
//     const pendingShipments = shipments.filter(s => s.status === 'Pending').length;
//     const avgQuantity = shipments.reduce((sum, s) => sum + s.quantity, 0) / totalShipments || 0;

//     return {
//       activeShipments: totalShipments,
//       pendingPercentage: (pendingShipments / totalShipments * 100).toFixed(1),
//       averageQuantity: avgQuantity.toFixed(1)
//     };
//   };

//   const stats = calculateStats();

//   if (isLoading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-6">
//       <h1 className="text-3xl font-bold text-center">Logistics Dashboard</h1>
//       <p className="text-xl text-center text-gray-600">Manage your shipments efficiently</p>

//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <h3 className="text-lg font-semibold">Active Shipments</h3>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">{stats.activeShipments}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <h3 className="text-lg font-semibold">Pending Shipments</h3>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">{stats.pendingPercentage}%</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <h3 className="text-lg font-semibold">Average Quantity</h3>
//           </CardHeader>
//           <CardContent>
//             <p className="text-3xl font-bold">{stats.averageQuantity}</p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <h3 className="text-lg font-semibold">Shipments Over Time</h3>
//           </CardHeader>
//           <CardContent className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={prepareChartData()}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="shipments" stroke="#2563eb" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Create New Shipment</h3>
//             </CardHeader>
//             <CardContent>
//               <p>Initiate a new shipment and streamline the export process.</p>
//             </CardContent>
//             <CardFooter>
//               <Button onClick={() => navigate('/new-shipment')}>New Shipment</Button>
//             </CardFooter>
//           </Card>
//           <Card>
//             <CardHeader>
//               <h3 className="text-lg font-semibold">Shipment Management</h3>
//             </CardHeader>
//             <CardContent>
//               <p>Monitor and manage all active shipments in real-time.</p>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" className="mr-2" onClick={() => navigate('/tracking')}>
//                 Track Shipments
//               </Button>
//               <Button variant="outline" onClick={() => navigate('/inventory')}>
//                 Inventory
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogisticsDashboard;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, DollarSign, ShoppingBag 
} from 'lucide-react';

import { Scale } from 'lucide-react';

const LogisticsDashboard = () => {
  // Sample data from the API
  const shipments = [
    {
      id: 10,
      containerNo: "Eum sunt itaque aute",
      description: "RWANDA ARABIC COFFEE",
      quantity: 320,
      quantityUnit: "bags",
      netWeight: "19200",
      amount: "101587.97",
      price: "240",
      consignee: "Sucafina SA",
      date: "2024-10-29T22:00:00.000Z",
      status: "Pending"
    },
    {
      id: 9,
      containerNo: "Irure repudiandae so",
      description: "RWANDA ARABICA COFFEE",
      quantity: 104,
      quantityUnit: "Bags",
      netWeight: "79",
      amount: "1527.41",
      price: "877",
      consignee: "Sucafina SA",
      date: "2024-10-29T22:00:00.000Z",
      status: "Pending"
    }
  ];

  // Calculate key metrics
  const totalShipments = shipments.length;
  const totalQuantity = shipments.reduce((sum, s) => sum + s.quantity, 0);
  const totalValue = shipments.reduce((sum, s) => sum + parseFloat(s.amount), 0);
  const avgPrice = shipments.reduce((sum, s) => sum + parseFloat(s.price), 0) / totalShipments;
  const totalWeight = shipments.reduce((sum, s) => sum + parseFloat(s.netWeight), 0);

  // Prepare data for charts
  const weightDistribution = shipments.map(s => ({
    name: `Container ${s.containerNo.slice(0, 8)}...`,
    weight: parseFloat(s.netWeight)
  }));

  const quantityDistribution = shipments.map(s => ({
    name: `Container ${s.containerNo.slice(0, 8)}...`,
    quantity: s.quantity
  }));

  const statusDistribution = {
    pending: shipments.filter(s => s.status === "Pending").length,
    completed: shipments.filter(s => s.status !== "Pending").length
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Logistics Dashboard</h1>
        <p className="text-gray-600">Real-time insights for all shipments</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Package className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Shipments</p>
                <h3 className="text-2xl font-bold">{totalShipments}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Quantity</p>
                <h3 className="text-2xl font-bold">{totalQuantity} bags</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <h3 className="text-2xl font-bold">{formatCurrency(totalValue)}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Scale className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Total Weight</p>
                <h3 className="text-2xl font-bold">{totalWeight} Kgs</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weight Distribution by Container</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weightDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weight" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quantity Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quantityDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pending', value: statusDistribution.pending },
                    { name: 'Completed', value: statusDistribution.completed }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0, 1].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Price per Unit:</span>
                <span className="font-bold">{formatCurrency(avgPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Primary Consignee:</span>
                <span className="font-bold">Sucafina SA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Main Product:</span>
                <span className="font-bold">RWANDA ARABIC COFFEE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping Status:</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                  {totalShipments} Active Shipments
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogisticsDashboard;